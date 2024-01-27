let url = 'http://universities.hipolabs.com/search?country=India' 


// search 
let btn = document.querySelector("button") ; 
let input = document.querySelector("input") ; 
// state-province

btn.addEventListener("click",async ()=>{

    let state = input.value ; 
    let college_list_data = await collegeData() ; 


    // filtering data 
    let college_list_name = filter_names(college_list_data) ;
    let college_list_states = filter_states(college_list_data) ;


    // console.log(college_list_name) ;
    // console.log(college_list_states) ;



    // Particular State Filter : 
    let Particular_State_Colleges = StateFilter(college_list_name,college_list_states,state) ;



    // show data 

    showNameCollege(Particular_State_Colleges) ;
})



async function collegeData(){

    try{
        let records = await axios.get(url) ;
        return records.data  ;
        // console.log(records) ; 
    }
    catch(err){
        console.log("error : " , err) ; 
    }

}

function filter_names(college_list){
    let list = [] ; 

    for(data of college_list){
        list.push(data.name) ;    
    }

    return list ;
}

function filter_states(college_list){
    let list = [] ; 

    for(data of college_list){
        list.push(data["state-province"]) ;    
    }

    return list ;
}


function StateFilter(col_name , col_state , user_state ){


    let list = [] ; 

    for( let i = 0 ; i<col_state.length ; i++ ){

        if( user_state == col_state[i]){
            list.push(col_name[i]) ; 
        }
    }

    return list ; 
}



function showNameCollege(college){
    let ul = document.querySelector("#list") ;
    console.log(college) ;

    if( college.length == 0 ){
        ul.innerText = "No Results ! May be You have Entered Wrong State or Recheck Your Spelling !" ; 
    }

    else{
        
    ul.innerText= " " ;
     for(data of college){
        let li = document.createElement("li") ; 
        li.innerText = data ; 
        ul.append(li) ;

    }
   }

}


