let ul=document.getElementById('card-all');
let link=document.getElementsByClassName('link');
var active=1;
link[active-1].classList.add('active')
function link_activation(event){
    for(all of link){
        if(all.classList.value=="link active"){
            all.classList.remove("active");

        }
    }
    event.target.classList.add("active")
    active=event.target.value;
    loaded()
}
function minus(e){
   
    if(active>1){
        for(all of link){
                all.classList.remove("active");
        }

        console.log(active)
        active--;   
        
        link[active-1].classList.add('active');
        console.log(active)
        loaded()

    } 

}
function plus(e){
   
    if(active < link.length){
        for(all of link){
                all.classList.remove("active");
        }
        console.log(active)

        active++;
        
        link[active-1].classList.add('active')
        console.log(active)
        loaded()
    }    

}
function loaded(){
    const xhr=new XMLHttpRequest();

    xhr.onreadystatechange=function(){
        if(xhr.readyState==4){
            if(xhr.status==200){
                let data=JSON.parse(xhr.responseText);
                
                displayblogs(data)
            }
            else{
                console.error('erroir loading blogs:',xhr.status);
            }
        }
    }
    xhr.open('GET',`/blog?status=${active}`,true);
    xhr.send();
}
function displayblogs(data){
    ul.innerHTML=''

    for(let i=0;i<data.length;i++){
        let card=document.createElement('div');
        card.className='card';
            let card_top=document.createElement('div');
            card_top.className='card-top'
            card.appendChild(card_top)
                let ancher=document.createElement('a');
                ancher.setAttribute('href','');
                ancher.href=`/show?show_id=${data[i]._id}`
                let img_tag=document.createElement('img');
                img_tag.setAttribute('scr',"");
                img_tag.src=`${data[i].file_name}`
                console.log(`${data[i].file_name}.webp`)
                ancher.appendChild(img_tag)
                card_top.appendChild(ancher)
            let card_bottom=document.createElement('div');
            card_bottom.className='card-bottom';
              let date=document.createElement('p');
              date.className='date';
              date.innerText=data[i].blog_date;
              card_bottom.appendChild(date);
              let blog_title=document.createElement('h2');
              blog_title.className='blog-title';
              blog_title.innerText=data[i].blog_title;
              card_bottom.appendChild(blog_title);
                let blog_inner_content=document.createElement('h2');
              blog_inner_content.className='blog-inner-content';
              blog_inner_content.innerText=data[i].blog_content;
              card_bottom.appendChild(blog_inner_content);
              let category=document.createElement('p');
              category.className='category';
              category.innerText=data[i].category;
              card_bottom.appendChild(category)
            card.appendChild(card_bottom)
            

        ul.appendChild(card)
    }

}