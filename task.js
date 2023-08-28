var express = require("express");
const pool = require("./pool");
var router = express.Router();

/* GET home page. */
router.post("/addtask", function (req, res, next) {
  pool.query(
    "insert into  addtask(title,description,task) values(?,?,?)",
    [req.body.title, req.body.description,req.body.task],
    function (error, result) {
      if (error) {
        console.log(error);
        res.status(500).json({ result: false });
      } else {
        console.log(result);

        res.status(200).json({ result: true });
      }
    }
  );
});

router.get("/displaytask", function (req, res) {
  pool.query("select * from addtask", function (error, result) {
    if (error) {
      res.status(500).json([]);
    } else {
      res.status(200).json(result);
    }
  });
});

router.post("/deletetask", function (req, res) {
  pool.query(
    "delete from addtask where titleid=?",
    [req.body.titleid],
    function (error, result) {
      if (error) {
        console.log(error);
        res.status(500).json({ result: false });
      } else {
        res.status(200).json({ result: true });
      }
    }
  );
});

router.post("/edittask", function (req, res, next) {
  pool.query(
    "update addtask set title=?, description=?,task=? where titleid=?",
    [req.body.title, req.body.description,req.body.task ,req.body.titleid],
    function (error, result) {
      if (error) {
        console.log(error);
        res.status(500).json({ result: false });
      } else {
        res.status(200).json({ result: true });
      }
    }
  );
});

router.post('/chkadminlogin', function(req, res, next) {
    pool.query("select * from login where email=? and password=?",[req.body.email,req.body.password],function(error,result){
        if(error)

        {  console.log("xxxx",error)
          res.status(500).json({result:false})}
        else
        { if(result.length==1)
            res.status(200).json({result:true})
        else
        res.status(200).json({result:false})}
        
    })
 
});

module.exports = router;
