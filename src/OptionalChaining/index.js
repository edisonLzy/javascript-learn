let customer = {
    name: "Carl",
    details: { age: 82 }
  };
  let customerCity = customer?.city ?? "暗之城";
  console.log(customerCity); // “暗之城”