import React from 'react'



class Converter extends React.Component {
  constructor(props){
    super(props);
    this.state={
      currencies:["USD","AUD","SGD","PHP","EUR"],
      base:"USD",
      amount:'',
      convertTo:'EUR',
      result:'',
      date:'',

    }
  }

  handleSelect = e => {
    this.setState(
      {
        [e.target.name]: e.target.value,
        result: null
      },
      this.calculate
    );
  };

  handleInput = e => {
    this.setState(
      {
        amount: e.target.value,
        result: null,
        date: null
      },
      this.calculate
    );
  };
  calculate=()=>{
    const amount=this.state.amount
    if(amount===isNaN){
      return;
    }
    else{
      fetch(`https://api.exchangeratesapi.io/latest?base=${this.state.base}`)
      .then(res=>res.json())
      .then(data=>{
        console.log(data)
        const date=data.date
        const result=(data.rates[this.state.convertTo]*amount).toFixed(4)
        this.setState({
          date,
          result,

        })

      })
    }
  }
  render(){
    const{currencies,base,amount,convertTo,result,date}=this.state;
    return(
      <div className="container">
        <div className="row">
          <div className="col-lg-6 mx-auto"></div>
        </div>
      <div className="card card-body">
        <h2>{amount} {base} is equivalent to </h2>
        <h2>{result} {convertTo}</h2>
        <p>As of {date}</p>
        <div className="row">
          <div className="col-lg-10 col-md-10">
            <form className="form-inline-im-4">
              <input  type="number" className="form-control form-control-lg-mx-3" onChange={this.handleInput} value={amount}></input>
              <select name="base" value={base} onChange={this.handleSelect} className="form-control form-control-lg">
                {currencies.map(currency=><option key={currency} value={currency}>{currency}</option>)}
              </select>
            </form>

            <form className="form-inline-im-4">
              <input  disabled={true}  value={result} className="form-control form-control-lg-mx-3"></input>
              <select  name="convertTo" value={convertTo} onChange={this.handleSelect} className="form-control form-control-lg">
                {currencies.map(currency=><option key={currency} value={currency}>{currency}</option>)}
              </select>
            </form>
          </div>
          <div className="col-lg-2 col-md-2 align-self-center">
            <h1 className="swap">&#8595;&#8593;</h1>
          </div>
        </div>
      </div>
    </div>

    )
  }
}

export default Converter;
