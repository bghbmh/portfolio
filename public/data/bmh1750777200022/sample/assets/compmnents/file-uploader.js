// file-uploader.js

import { UploadFiles } from '../assets/js/custom-library/bUploadFile/export-bUploadFile.js';
import commonSheet from './styles/style-common.js'; // 필요시 공통 스타일 임포트

import * as DOM from './Utils-dom.js';

// 기존 defaultPreviewMarkUp 함수는 이제 사용되지 않거나,
// 혹은 외부에서 함수가 주입되지 않았을 때의 '폴백(fallback)'으로만 사용될 수 있습니다.
// 여기서는 외부에서 항상 함수를 주입한다고 가정하고, 웹 컴포넌트 내부에서는 기본 마크업 함수를 정의하지 않습니다.
// 만약 외부에서 주입되지 않았을 때도 동작하게 하고 싶다면, 아래에 defaultPreviewMarkUp를 유지하고
// UploadFiles 초기화 시 `this._onPreviewMarkUpFunction || defaultPreviewMarkUp` 와 같이 사용하면 됩니다.


// UploadFiles 라이브러리에서 사용할 CSS 스타일 정의 (이전과 동일)
function setCssStyle(){
	// CSS 파일 연결
	return `

:host{


}




`
}

class FileUploader extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });

        this.uploadFilesInstance = null;
        this._filesToLoad = [];
        this._onPreviewMarkUpFunction = null; // 외부에서 주입될 미리보기 마크업 함수를 저장할 변수
		this._controlPanelSlotName = 'control-panel'; // 동적으로 생성할 슬롯 이름

        const sheet = new CSSStyleSheet();
        sheet.replaceSync(setCssStyle());
        this.shadowRoot.adoptedStyleSheets = [ commonSheet, sheet ];

        this.shadowRoot.innerHTML = `
                <slot name="upload-button"></slot>
                <slot name="file-box"></slot>
        `; // <slot name="file-item-template" style="display: none;"></slot>
    }

	async loadStylesSheets( cssFilePaths ) {
        try {
			const loadedSheets = await Promise.all(
				cssFilePaths.map(path => this.getStyleSheet(path))
			);

			this.shadowRoot.adoptedStyleSheets = [
				...this.shadowRoot.adoptedStyleSheets,
				...loadedSheets
			];
        } catch (error) {
            console.error('Failed to apply all stylesheets:', error);
        }
    }
	
	async getStyleSheet(cssPath) {
        try {
            const response = await fetch(cssPath);
            if (!response.ok) {
                throw new Error(`Failed to load CSS: ${response.statusText} from ${cssPath}`);
            }
            const cssText = await response.text();
            const sheet = new CSSStyleSheet();
            sheet.replaceSync(cssText);
            return sheet;
        } catch (error) {
            console.error(`Error loading stylesheet ${cssPath}:`, error);
            return new CSSStyleSheet();
        }
    }	

	static get observedAttributes() {
        return ['multiple', 'max-files', 'name'];
    }

    connectedCallback() {  
		// UploadFiles 인스턴스는 한 번만 생성되도록 처리
        if (this.uploadFilesInstance) {
            return; 
        }

        const uploadButton = this.querySelector('[slot="upload-button"]');
        const fileBox = this.querySelector('[slot="file-box"]');

        if (!uploadButton || !fileBox) {
            console.error("file-uploader: 'upload-button' or 'file-box' slot content not found.");
            return;
        }

        this.uploadFilesInstance = UploadFiles.init({
            loadBtn: uploadButton,
            fileBox: fileBox,
            multiple: this.hasAttribute('multiple'),
            maxFiles: parseInt(this.getAttribute('max-files') || '0', 10),
            name: this.getAttribute('name') || 'uploaded-file',
            // onPreviewMarkUp 콜백에 외부에서 주입된 함수를 전달
            onPreviewMarkUp: this._onPreviewMarkUpFunction, 
            // onSetFiles 콜백은 UploadFiles 내부에서 create 메서드 초기에 한 번 호출됩니다.
            // 여기서는 _filesToLoad에 임시 저장된 데이터를 반환하도록 합니다.
            onSetFiles: () => ({ files: this._filesToLoad }) 
        });

        this.zuFile = this.uploadFilesInstance;

		// UploadFiles 인스턴스가 생성된 후에, 필요한 경우 동적으로 control-panel 슬롯을 생성하고 연결합니다.
        this._handleControlPanelSlot();

		//console.log("================== files connectedCallback - " )

    }

    disconnectedCallback() {
        if (this.uploadFilesInstance) {
            // 모든 객체 URL을 해제하여 메모리 누수 방지
            this.uploadFilesInstance.deleteAllFiles(); 
            this.uploadFilesInstance = null; // 인스턴스 참조 제거
        }
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (this.uploadFilesInstance) {
            switch (name) {
                case 'multiple':
                    this.uploadFilesInstance.handler.multiple = this.hasAttribute('multiple');
                    // multiple 속성이 변경될 때 control-panel의 가시성도 업데이트
                    // (UploadFiles 내부에서 deleteBtn과 fileCountEl을 핸들링해야 함)
                    // 이 부분은 UploadFiles 라이브러리 내부 로직에 따라 달라질 수 있습니다.
                    // UploadFiles가 deleteBtn과 fileCountEl을 초기화 시점에만 참조하고
                    // 이후에는 사용하지 않는다면 이 setter에서는 추가적인 작업이 필요 없을 수 있습니다.
                    // 하지만 일반적으로는 handler 내부에 해당 요소의 참조를 유지해야 합니다.
                    break;
                case 'max-files':
                    this.uploadFilesInstance.handler.maxFiles = parseInt(newValue || '0', 10);
                    break;
                case 'name':
                    break;
            }
        }
    }

    // `files` setter (이전과 동일)
    set files(fileDataArray) {

		//console.log("================== files - ",fileDataArray)

        if (Array.isArray(fileDataArray)) {
            this._filesToLoad = fileDataArray;
            // UploadFiles 인스턴스가 이미 생성되었다면 즉시 업데이트
            if (this.uploadFilesInstance) {
                this.uploadFilesInstance.deleteAllFiles(); // 기존 파일 제거
                fileDataArray.forEach(fileInfo => {
                    this.uploadFilesInstance.makeFileSomeThing(fileInfo, this.uploadFilesInstance.localProcessFiles.bind(this.uploadFilesInstance));
                });
            }
        } else {
            console.warn("file-uploader: 'files' 속성은 배열이어야 합니다.");
            this._filesToLoad = [];
        }
    }

    get files() {
        return this.uploadFilesInstance ? this.uploadFilesInstance.getSelectedFiles() : this._filesToLoad;
    }

    // 새로운 setter: 미리보기 마크업 함수를 외부에서 주입받습니다.
    set onPreviewMarkUp(func) {
        if (typeof func === 'function') {
            this._onPreviewMarkUpFunction = func;
            // 이미 UploadFiles 인스턴스가 생성되었다면, handler를 업데이트
            if (this.uploadFilesInstance) {
                this.uploadFilesInstance.handler.onPreviewMarkUp = func;
            }
        } else {
            console.warn("file-uploader: 'onPreviewMarkUp' 속성은 함수여야 합니다.");
            this._onPreviewMarkUpFunction = null;
            if (this.uploadFilesInstance) {
                this.uploadFilesInstance.handler.onPreviewMarkUp = null; // 함수가 아니면 null로 설정
            }
        }
    }

    get onPreviewMarkUp() {
        return this._onPreviewMarkUpFunction;
    }

    getSelectedFiles() {
        return this.uploadFilesInstance ? this.uploadFilesInstance.getSelectedFiles() : [];
    }

	    /**
     * multiple 속성에 따라 control-panel 슬롯을 동적으로 생성하고 연결합니다.
     * UploadFiles가 생성한 option-ctrl-wrap 요소에 slot 속성을 할당합니다.
     */
    _handleControlPanelSlot() {
        // 이미 control-panel 슬롯이 있는지 확인
        let existingSlot = this.shadowRoot.querySelector(`slot[name="${this._controlPanelSlotName}"]`);
        
        // multiple 속성이 있는지 확인
        const isMultiple = this.hasAttribute('multiple');

        if (isMultiple && !existingSlot) {
            // multiple인데 슬롯이 없으면 새로 생성하여 file-box 슬롯 위에 삽입
            const newSlot = document.createElement('slot');
            newSlot.name = this._controlPanelSlotName;
            
            const fileBoxSlot = this.shadowRoot.querySelector('slot[name="file-box"]');
            if (fileBoxSlot) {
                fileBoxSlot.before(newSlot); // file-box 슬롯 앞에 삽입
            } else {
                // file-box 슬롯이 없으면 upload-type-wrap의 마지막에 추가 (fallback)
                this.shadowRoot.querySelector('.upload-type-wrap').appendChild(newSlot);
            }
            existingSlot = newSlot; // 새로 생성된 슬롯 참조 업데이트

            // UploadFiles가 생성한 .option-ctrl-wrap을 찾아서 slot 속성 할당
            // 이 시점에서는 UploadFiles가 이미 초기화되어 option-ctrl-wrap이 생성되어 있어야 합니다.
            // UploadFiles의 생성 시점에 따라 setTimeout 등으로 지연이 필요할 수도 있습니다.
            // 가장 좋은 방법은 UploadFiles가 option-ctrl-wrap을 생성한 후,
            // 해당 요소를 외부에 노출하는 콜백이나 프로퍼티를 제공하는 것입니다.
            // 여기서는 fileBox의 자식으로 생겼다고 가정하고 탐색합니다.
            const optionCtrlWrap = this.querySelector('.option-ctrl-wrap'); // light DOM에서 찾음
            if (optionCtrlWrap) {
                optionCtrlWrap.setAttribute('slot', this._controlPanelSlotName);
                // console.log("동적으로 슬롯 생성 및 option-ctrl-wrap에 연결:", optionCtrlWrap);
            } else {
                console.warn("file-uploader: 'multiple' 속성 시 .option-ctrl-wrap을 찾을 수 없습니다. UploadFiles가 아직 생성하지 않았거나 다른 위치에 있습니다.");
            }

        } else if (!isMultiple && existingSlot) {
            // multiple이 아니고 슬롯이 있으면 제거
            existingSlot.remove();
            // 연결된 .option-ctrl-wrap의 slot 속성도 제거 (선택 사항, 깔끔한 정리를 위해)
            const optionCtrlWrap = this.querySelector('.option-ctrl-wrap');
            if (optionCtrlWrap && optionCtrlWrap.getAttribute('slot') === this._controlPanelSlotName) {
                optionCtrlWrap.removeAttribute('slot');
            }
        }
    }
}

customElements.define('file-uploader', FileUploader);