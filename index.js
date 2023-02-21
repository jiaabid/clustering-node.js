const express = require("express");
const app = express();
const fs = require("fs")
const cluster = require("cluster")
const os = require("os")
const totalCpus = os.cpus() //total CPUs


//test route
app.get("/test", (req, res) => {
    fs.readFile("./test.txt", "utf-8", console.log)
    res.json({
        success: "done!"
    })
})

// clustering
// if its a master process, then fork it
if (cluster.isPrimary) {
    totalCpus.forEach(_ => cluster.fork())
} else {
    app.listen(2222, () => console.log("server started!"))
}

//server without clustering
// app.listen(2222,()=>console.log("server started!"))
