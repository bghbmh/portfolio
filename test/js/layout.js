'use strict';

/*

item : [ string : name, array : list ]

*/


	var template = {
		'rawData' : [],
		items : [],   //[ name, list ]
		selectedItem : [],

		categoryLIST : function(item){

			//console.log('categoryLIST');
			let list = '';

			for( let i=0; i<item.length; i++)
			{
				list = list + `<div style="background: url('${item[i].bg}');"><img src="${item[i].img}"></div>`;
			}					
			
			return list;
		},

		detailITEM : function(idx, parentNode){

			let a = this.selectedItem[idx];			
			let d = this.selectedItem[idx].detail;
			parentNode.style.backgroundImage = "url('" + d.bg + "')";

			let tag = `<img src="${a.detail.img}">`;
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
					default :
						list = list + `<li><dl><dt>${key}</dt><dd>${d[key]}</dd></dl></li>`;
				}
			}

			list = list + `<li><div class="hashtag">`;
			for( let i=0; i<a.hashtag.length; i++)
				list = list + `<span>${a.hashtag[i]}</span>`;
			
			list = list + `</div></li></ul>`;

			return tag + list;

		},

		allITEMS : function(){

			console.log(this.selectedItem);
			let list = '';

			for( let i=0; i<this.selectedItem.length; i++ )
			{
				if( this.selectedItem[i].src === '' )
				{
					list = list + `<li class="notYet"><img src="img/icons_myFace.svg"><br>준비중입니다<div>`; 
				}
				else
				{
					list = list + `<li><img src="${this.selectedItem[i].src}"><div>`;
				}
				

				for( let j=0; j<this.selectedItem[i].hashtag.length; j++ )
				{
					list = list + `<span>${this.selectedItem[i].hashtag[j]}</span>`;
				}

				list = list + `</div></li>`;
			}

			return list;
		},

		selectedCategory : function(name){

			
			let arr = [];

			if( name === 'all')
			{
				arr = this.rawData; //console.log('111arr',arr);
			}
			else
			{	console.log('111arr',name, this.items);			
				//대표작 보여주는 서브페이지에서 선택된 항목들 보여줄때
				for( let key in this.items )
				{					
					if( this.items[key].name === name )
						arr = this.items[key].list;
				}
				console.log('name / arr : ',arr);
				
			}

			
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
		selectedHASHTAG : function(hashTxt){
			
			let idx = [];
			let arr = [];

			let ht = hashTxt.split('#');
			//console.log('layout.js :: selectedHASHTAG', this.rawData);

			for( let i=0; i<ht.length; i++ )
			{
				if( i==0 )
				{
					//console.log('000 a.length : ', this.rawData.length );

					for( let j=0; j<this.rawData.length; j++ )
					{
						for( let k=0; k<this.rawData[j].hashtag.length; k++ )
						{
							if( ht[i] === this.rawData[j].hashtag[k] )
							{
								arr.push(this.rawData[j]);
								idx.push(j);

								//console.log( this.rawData[j].hashtag);
							}
						}
					}
				}
				else
				{
					//console.log('111 a.length : ', this.rawData.length );
					for( let j=0; j<this.rawData.length; j++ )
					{
						let isThere = false;
						for( let k=0; k<idx.length; k++ )
						{
							//console.log( ' j === idx[k]  : ', j , idx[k]  );
							if( j === idx[k] )
								isThere = true;
						}

						if( !isThere )
						{
							for( let x=0; x<this.rawData[j].hashtag.length; x++ )
							{
								if( ht[i] === this.rawData[j].hashtag[x] )
								{
									arr.push(this.rawData[j]);
								}
							}
						}
					}
				}
				
			}

			//console.log( 'arr : ', arr );
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
		}
	}

	function findCategory(name){
		//items에서 'name' 아이템 찾고	
		template.selectedItem = [];	
		for( let x=0; x<template.items.length; x++ )
		{
			for(let key in template.items[x])
			{						
				if( template.items[x][key] === name )
					return template.items[x].list;
			}			
		}
	}

	function setCategoryList(name){ //, parentNode
			
		let t = findCategory(name);

		// 'name' 아이템 중 상세내용이 있는 것들 찾기
		let m =[];
		for( let i=0; i<t.length; i++ )
		{
			for(let key in t[i])
			{
				if( key === "detail")
				{
					m.push(t[i].detail);
					template.selectedItem.push(t[i]);
				}
				
			}
		}

		//console.log('mmmmmmm =====', m);

		return template.categoryLIST(m);

	}

	// function setDetailPage(idx, parentNode){
	// 	//console.log('555555555555555 : ', template.detailITEM(idx));
	// 	return template.detailITEM(idx, parentNode);
	// }
	

	// function setSelectedAllItemsPage(name){
	// 	return template.selectedCategory(name);
	// }


	function arrangedFile(jsonObj) { //json에 있는 내용들 카테고리 종류 확인해서 각각 분류해두기

		let ct = [];
		template.rawData = jsonObj;
		//json 파일에 있는 카테고리 찾아보고
		for( let i=0; i<jsonObj.length; i++) 
		{
			if( i===0 )//첫번째 카테고리는 우선 넣기
				ct.push(jsonObj[i]['category']);

			let isThere = false;
			for( let x=0; x<ct.length; x++)
			{
				if ( ct[x] === jsonObj[i]['category'] )
					isThere = true;
			}

			if( !isThere )
				ct.push(jsonObj[i]['category']);
		}

		//items 설정하고
		for( let x=0; x<ct.length; x++ )
		{
			template.items.push({});					
			template.items[x].name = ct[x];
			template.items[x].list = [];					
		}

		for( let i=0; i<jsonObj.length; i++) //카테고리 별로 항목 분류해서 아이템에 넣기
		{
			for( let x=0; x<template.items.length; x++ )
			{
				if( template.items[x].name === jsonObj[i]['category'] )
					template.items[x].list.push(jsonObj[i]);						
			}
		}
		
	}	


console.log('template : ', template);
