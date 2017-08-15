const router = require("koa-router")();
import multer, { diskStorage } from "koa-multer";

const storage = diskStorage({
  destination: (req, file, cb) => {
    cb(null, "/Users/zcf/Documents/pictureUpload/server/uploads");
  },
  filename: function(req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({ storage });

router.get("/", async (ctx, next) => {
  ctx.body = "Welcome!";
});

router.post("/image", upload.single("file"), async (ctx, next) => {
  //console.log(ctx.req.body);
  const files = ctx.req.file;
  console.log(files);
  ctx.response.body = JSON.stringify({ name: files.originalname });
});

router.get("/string", async (ctx, next) => {
  ctx.body = "koa2 string";
});

router.get("/json", async (ctx, next) => {
  ctx.body = {
    title: "koa2 json"
  };
});

module.exports = router;
