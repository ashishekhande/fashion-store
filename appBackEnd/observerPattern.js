class Observer{
  customerIds = [];
  customers = [];

  constructor() {}

  Subscribe(customer) {
    try {
      this.customers.push(customer);
      this.customerIds.push(customer.getMail());

      return this.customerIds;

    } catch (exp) {
      console.log(exp)
    }
  }

  Unsubscribe(cust) {
    if (this.customerIds.indexOf(cust.getMail()) !== -1) {
      let index = this.customerIds.indexOf(cust.getMail());
      this.customerIds.splice(index, 1);

      this.customers.forEach((oCust, i) => {
        if (oCust.getMail() == cust.getMail()){
          this.customers.splice(i, 1);
        }
      });

      return this.customerIds;

    } else {
      return false
    }
  }

  Notify(data) {
    this.customers.forEach(function (customer) {
      // console.log(customer);
      customer.update(data);
    });
  }

}

module.exports = Observer;