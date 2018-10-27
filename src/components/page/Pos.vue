<template>
  <div class="pos">
    <el-row >
      <el-col :span='11' class="pos-order" id="order-list">

        <el-tabs>

          <el-tab-pane label="点餐">
           <el-table :data="tableData" border  style="width: 100%" >

            <el-table-column prop="goodsName" label="商品"  >
              
            </el-table-column>
            <el-table-column prop="count" label="数量" width="60"></el-table-column>
            <el-table-column prop="price" label="单价" width="60"></el-table-column>
            <el-table-column  label="操作" width="100" >
              <template slot-scope="scope">
                <el-button type="text" size="small" @click="delSingleGood(scope.row)">删除</el-button>
                <el-button type="text" size="small" @click='addOrderList(scope.row)'>增加</el-button>
              </template>
              </el-table-column>
            </el-table>  
            <div class="div-btn">
              <el-button type="warning" @click="delAllGoods">清零</el-button>
              <el-button type="danger" @click="checkout">结账</el-button>
              <el-button type="success" >总额{{totalMoney}}元</el-button>
            </div> 
          </el-tab-pane>
          <el-tab-pane label="预定">
          此版块尚未制作
          </el-tab-pane>
          <el-tab-pane label="外卖">
          此版块尚未制作
          </el-tab-pane>
        </el-tabs>
      </el-col>
      <!--商品展示-->
      <el-col :span="11" class="pos-order-right">
           <div class="often-goods">
              <div class="title">常用商品</div>
              <div class="often-goods-list">
                <ul>
                  <li v-for="goods in oftenGoods" @click='addOrderList(goods)'>
                    <span>{{goods.goodsName}}</span>
                    <span class="o-price">￥{{goods.price}}元</span>
                  </li>
                </ul>
              </div>
            </div>
            <div class="goods-type">
              <el-tabs >
                <el-tab-pane label="汉堡" >
                  <ul class='cookList'>
                    <li v-for="goods in type0Goods"    @click='addOrderList(goods)'>
                      <span class="foodImg"><img src="../../assets/hanbao.jpg" width="100%"></span>
                      <span class="foodName">{{goods.goodsName}}</span>
                      <span class="foodPrice">￥{{goods.price}}元</span>
                    </li>
                  </ul>
                </el-tab-pane>
                  <el-tab-pane label="小食">
                  <ul class='cookList'>
                    <li v-for="goods in type1Goods"   @click='addOrderList(goods)'>
                      <span class="foodImg"><img src="../../assets/hanbao.jpg" width="100%"></span>
                      <span class="foodName">{{goods.goodsName}}</span>
                      <span class="foodPrice">￥{{goods.price}}元</span>
                    </li>
                  </ul>
                </el-tab-pane>
                <el-tab-pane label="饮料">
                  <ul class='cookList'>
                    <li v-for="goods in type2Goods"  @click='addOrderList(goods)'>
                      <span class="foodImg"><img src="../../assets/hanbao.jpg" width="100%"></span>
                      <span class="foodName">{{goods.goodsName}}</span>
                      <span class="foodPrice">￥{{goods.price}}元</span>
                    </li>
                  </ul>
                </el-tab-pane>
                <el-tab-pane label="套餐">
                  <ul class='cookList'>
                    <li v-for="goods in type3Goods" @click='addOrderList(goods)'>
                      <span class="foodImg"><img src="../../assets/hanbao.jpg" width="100%"></span>
                      <span class="foodName">{{goods.goodsName}}</span>
                      <span class="foodPrice">￥{{goods.price}}元</span>
                    </li>
                  </ul>
                </el-tab-pane>
              </el-tabs>
            </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'Pos',
  // mounted:function(){
  //   var orderHeight=document.body.clientHeight;
  //   document.getElementById("order-list").style.height=orderHeight+'px';
  // },
  data(){
    return{
      tableData: [],

      oftenGoods:[
        
      ],
      type0Goods:[
          
      ],
      type1Goods:[
          
      ],
      type2Goods:[
          
      ],
      type3Goods:[
          
      ],
      totalMoney:0
    }
  },
  beforeMount:function(){
    axios.get('https://www.easy-mock.com/mock/5b8b30dbf032f03c5e71de7f/kuaican/oftenGoods')
    .then(res=>{
      console.log(res.data)
      this.oftenGoods=res.data

    })
    .catch(err=>{
      console.log(err)
      console.log('出错了')
    })
    axios.get('https://www.easy-mock.com/mock/5b8b30dbf032f03c5e71de7f/kuaican/typeGoods')
      .then(res=>{
         console.log(res.data);
         //this.oftenGoods=res.data;
         this.type0Goods=res.data[0];
         this.type1Goods=res.data[1];
         this.type2Goods=res.data[2];
         this.type3Goods=res.data[3];
      })
      .catch(err=>{
          console.log(err);
          alert('网络错误，不能访问');
      })
  },
  methods:{
    addOrderList(goods){
      this.totalMoney = 0
      let isHave = false
      for(let i = 0;i<this.tableData.length;i++){
        if(this.tableData[i].goodsId == goods.goodsId){
          isHave = true
        }
      }

      if(isHave){
        let arrP = this.tableData.filter(o =>o.goodsId == goods.goodsId)
        arrP[0].count++
      }else{
         let newGoods={goodsId:goods.goodsId,goodsName:goods.goodsName,price:goods.price,count:1}
        this.tableData.push(newGoods)
      }
      this.tableData.forEach(ele=>{
        this.totalMoney = this.totalMoney+(ele.price*ele.count)
      })
    },
    delSingleGood(goods){
      let arrM = this.tableData.filter(o => o.goodsId ==goods.goodsId)
      arrM[0].count--
      if(arrM[0].count == 0){
         this.tableData=this.tableData.filter(o => o.goodsId !=goods.goodsId)
      }
      this.totalMoney = 0
      this.tableData.forEach(ele=>{
        this.totalMoney = this.totalMoney+(ele.price*ele.count)
      })

    },
    delAllGoods() {
      this.tableData = [];
      this.totalCount = 0;
      this.totalMoney = 0;
    },
    checkout(){
      if(this.totalMoney !== 0){
        this.$message({
            message: '结账成功，您的商品马上就好！',
            type: 'success'
        })
        this.tableData = []
        this.totalMoney = 0
      }else if(this.totalMoney == 0){
         this.$message({
            message: '您还未点购商品，快去下单吧！',
            type: 'warning'
        })
      }
    }
  }
  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .pos-order{
    background-color: #f9fafc;
    border-right: 1px solid #c0ccda ;
    height: 100vh;
    width: 47%
  }
  .pos-order-right{
    float: right;
    width: 47%
  }
  .div-btn{
    text-align: center;
  }
  .title{
     height: 20px;
     border-bottom:1px solid #D3DCE6;
     background-color: #F9FAFC;
     padding:10px;
   }
   .often-goods-list ul li{
    list-style: none;
    float:left;
    border:1px solid #E5E9F2;
    padding:10px;
    margin:5px;
    background-color:#fff;
    cursor: pointer;
   }
  .o-price{
    color:#58B7FF; 
   }
   .goods-type{
    clear: both;
    text-align: center;
   }

   .cookList li{
     list-style: none;
     width:20%;
     border:1px solid #E5E9F2;
     height: auto;
     overflow: hidden;
     background-color:#fff;
     padding: 2px;
     float:left;
     margin: 2px;
     cursor: pointer;
   }
   .cookList li span{
      display: block;
      float:left;
   }
   .foodImg{
     width: 65%;
   }
   .foodName{
     font-size: 16px;
     padding-left: 10px;
     color:brown;
   }
   .foodPrice{
     font-size: 16px;
     padding-left: 10px;
     padding-top:10px;
   }
</style>
