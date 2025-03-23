class YieldInfo{
    yield_id
    harvest_date
    yield_per_acre
    market_prices
    revenue
    farm_id
    constructor(yield_id,harvest_date,yield_per_acre,market_prices,revenue,farm_id){
        this.yield_id=yield_id
        this.harvest_date=harvest_date
        this.yield_per_acre=yield_per_acre
        this.market_prices=market_prices
        this.revenue=revenue
        this.farm_id=farm_id
    }
    getYield_id(){
        return this.yield_id
    }
    setYield_id(yield_id){
        this.yield_id=yield_id
    }
    getHarvest_date(){
        return this.harvest_date
    }
    setHarvest_date(harvest_date){
        this.harvest_date=harvest_date
    }
    getYield_per_acre(){
        return this.yield_per_acre
    }
    setYield_per_acre(yield_per_acre){
        this.yield_per_acre=yield_per_acre
    }
    getMarket_prices(){
        return this.market_prices
    }
    setMarket_prices(market_prices){
        this.market_prices=market_prices
    }
    getRevenue(){
        return this.revenue
    }
    setRevenue(revenue){
        this.revenue=revenue
    }
    getFarm_id(){
        return this.farm_id
    }
    setFarm_id(farm_id){
        this.farm_id=farm_id
    }
}
module.exports=YieldInfo