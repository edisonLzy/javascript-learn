const target = {}; 
const handler = {};
const { proxy, revoke } = Proxy.revocable(target, handler);


console.dir(proxy);
console.dir(revoke);
proxy.name = "阿宝哥";
console.log(proxy.name); // 阿宝哥

revoke();
console.log(proxy.name); // TypeError: Revoked