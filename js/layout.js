'use strict';

/*

item : [ string : name, array : list ]

*/
class layout{

	constructor(){
		this.rawData = [];
		this.categories = [];
	}


		arrange(jsonObj){


			this.rawData = jsonObj;


			console.log('layout : ', layout);
		}

}


	var template = {
		// rawData : [],
		// categories : [],   //[ name, list ]

		findCategory : function(name){

			for( let x=0; x<this.categories.length; x++ )
			{
				for(let key in this.categories[x])
				{						
					if( this.categories[x][key] === name )
						return this.categories[x].list;
				}			
			}

		},

		SetItemsList : function(arr){

			console.log("defalutSetItem", arr);
			let list = '';

			for( let i=0; i<arr.length; i++ )
			{
				if( arr[i].src === '' )
				{
					list = list + `<li class="notYet"><img src="img/icons_myFace.svg"><br>준비중입니다<div>`; 
				}
				else
				{
					list = list + `<li><img src="${arr[i].src}"><div>`;
				}

				for( let j=0; j<arr[i].hashtag.length; j++ )
				{
					list = list + `<span>${arr[i].hashtag[j]}</span>`;
				}

				list = list + `</div></li>`;
			}

			return list;

		},	

		setCategoryLIST : function(name){

			let t = this.findCategory(name);

			// 'name' 아이템 중 상세내용이 있는 것들 찾기
			let m =[];
			for( let i=0; i<t.length; i++ )
			{
				for(let key in t[i])
					if( key === "detail") m.push(t[i].detail);
			}

			let list = '';

			for( let i=0; i<m.length; i++)
			{
				list = list + `<div style="background: url('${m[i].bg}');"><img src="${m[i].img}"></div>`;
			}					
			
			return list;

		},

		detailITEM : function(name, idx, parentNode){

			// let a = this.selectedItem[idx];			
			// let d = this.selectedItem[idx].detail;
			let arr = this.findCategory(name);

			let items =[];
			for( let i=0; i<arr.length; i++ )
			{
				for(let key in arr[i])					
					if( key === "detail") items.push(arr[i]);	
			}

			parentNode.style.backgroundImage = `url('${items[idx].detail.bg}')`;

			let d = items[idx].detail;
			let tag = `<img src="${d.img}">`;
			let list =`<ul>`;			
			for( let key in d )
			{
				switch (key){
					case 'bg' :
						break;
					case 'img' :
						break;
					case '주 사용색' :
						list = list + `<li><dl><dt>${key}</dt><dd>`;
						for( let i=0; i<d[key].length; i++)
						{
							list = list + `<span class="colors" style="background-color:${d[key][i]}"></span>`;
						}
						list = list + `</dd></dl></li>`;
						break;
					case '링크' :
						list = list + `<li><dl><dt>${key}</dt><dd><button class="sampleSite" data-link="${d[key]}">샘플보기</button></dd></dl></li>`;
						
						break;
					default :
						list = list + `<li><dl><dt>${key}</dt><dd>${d[key]}</dd></dl></li>`;
				}
			}

			list = list + `<li><div class="hashtag">`;
			for( let i=0; i<items[idx].hashtag.length; i++)
				list = list + `<span>${items[idx].hashtag[i]}</span>`;
			
			list = list + `</div></li></ul>`;

			return tag + list;

		},

		selectedCategory : function(name){ console.log("selectedCategory");

			if( name === 'all')
				return this.SetItemsList(this.rawData); //console.log('111arr',arr);

			//대표작 보여주는 서브페이지에서 선택된 항목들 보여줄때		
			return this.SetItemsList(this.findCategory(name));
		


		},

		selectedHASHTAG : function(hashTxt){
			
			let idx = [];
			let arr = [];

			let ht = hashTxt.split('#');
			//console.log('layout.js :: selectedHASHTAG', this.rawData);

			for( let i=0; i<ht.length; i++ )
			{
				if( i==0 )
				{ //console.log('000 a.length : ', this.rawData.length );

					for( let j=0; j<this.rawData.length; j++ )
					{
						for( let k=0; k<this.rawData[j].hashtag.length; k++ )
						{
							if( ht[i] === this.rawData[j].hashtag[k] )
							{
								arr.push(this.rawData[j]);
								idx.push(j); //console.log( this.rawData[j].hashtag);
							}
						}
					}
				}
				else
				{ //console.log('111 a.length : ', this.rawData.length );
					for( let j=0; j<this.rawData.length; j++ )
					{
						let isThere = false;

						for( let k=0; k<idx.length; k++ )
							if( j === idx[k] ) isThere = true;

						if( !isThere )
						{
							for( let x=0; x<this.rawData[j].hashtag.length; x++ )
							{
								if( ht[i] === this.rawData[j].hashtag[x] )
									arr.push(this.rawData[j]);
							}
						}
					}
				}
				
			}

			return this.SetItemsList(arr);
		},

		arrange : function(jsonObj){

			template.rawData = jsonObj;
			template.categories = [];

			//json 파일에 있는 카테고리 찾아보고
			template.categories = [{}];					
			template.categories[0].name = jsonObj[0]['category'];
			template.categories[0].list = [];

			for( let i=0; i<jsonObj.length; i++) 
			{
				let isCategory = false;
				for( let x=0; x<template.categories.length; x++)
				{
					if ( template.categories[x].name === jsonObj[i]['category'] )
					{
						template.categories[x].list.push(jsonObj[i]);
						isCategory = true;
					}
				}

				if( !isCategory )
				{
					template.categories.push({});	
					let idx = template.categories.length; 			
					template.categories[idx-1].name = jsonObj[i]['category'];
					template.categories[idx-1].list = [];
					template.categories[idx-1].list.push(jsonObj[i]);	
				}
			}

			//console.log('arrangedFile : ', template);
		}
	}

