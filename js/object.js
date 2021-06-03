'use strict';


class CheckTagwithClassName{
	constructor(e) {

		this.tag = e.currentTarget.nodeName;// li 를 받고
		this.parent = e.currentTarget.parentNode; // 부모노드 찾고
		this.child = this.parent.querySelectorAll(this.tag);// 부모노드에 들어있는 li들 찾고 
	}

	cleanClassName(str){ //이름이 str인 클래스는 모두 삭제 
		//목록 중 on 남아있으면 우선 삭제
		for( let i=0; i<this.parent.childElementCount; i++ ) //개수
		{
			let cn = this.child[i].className.split(" ");
			for( let j=0; j<cn.length; j++ )
			{
				if( cn[j] == str ) // on이 있으면
					this.child[i].classList.remove(str); // on 삭제
			}
		}
	}

	findClassNameList(str)
	{
		for( let i=0; i<this.parent.childElementCount; i++ ) 
		{
			let cn = this.child[i].className.split(" ");
			for( let j=0; j<cn.length; j++ )
			{
				if( cn[j] == str ) // on이 있으면//몇 번째에 있는지 확인
				{   console.log("ccc on이 있으면 : " + j);
				return i;
				}
			}            
		} 

		return -1; 
	}

}  

var clickElement = {

	find : function(elem, tagName){

			let elemName = elem.nodeName;

			while( elemName !== tagName )
			{
				elem = elem.parentNode;

				if( elem === document ) return null;

				elemName = elem.nodeName;
				console.log( 'while : ', elemName);
			}		
			
			return elem;
		}

}

