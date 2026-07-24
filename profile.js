function generateRoadmap(){


let data={

skill:document.getElementById("skill").value,

level:document.getElementById("level").value,

goal:document.getElementById("goal").value,

time:document.getElementById("time").value

};



if(data.skill===""){

alert("Enter skill");

return;

}



sessionStorage.setItem(
"learningData",
JSON.stringify(data)
);



window.location="roadmap.html";


}