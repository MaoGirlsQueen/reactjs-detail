async function test(){
    const Redis = require("ioredis")
    const redis = new Redis({
        port:6378,
        password:123456
    })
   await redis.set("a",1234)
   await redis.setex("c",3,345);
   const keys = await redis.keys("*")
   console.log("keys",keys)
    const gets = await redis.get("c")
    console.log("gets",gets)
}
test()