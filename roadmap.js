let data =
JSON.parse(
sessionStorage.getItem("learningData")
);



document.getElementById("roadmap").innerHTML=`

<h2>
${data.skill} Roadmap
</h2>


<h3>
Level 1: Fundamentals
</h3>

<p>
Learn basics and concepts.
</p>


<h4>🎥 Videos</h4>

<a href="#">
YouTube Course Link
</a>


<h4>📚 Documentation</h4>

<a href="#">
Official Documentation
</a>



<h3>
Level 2: Practice
</h3>


<p>
Build mini projects.
</p>


<h4>
Task:
</h4>

<p>
Create your first project.
</p>

`;