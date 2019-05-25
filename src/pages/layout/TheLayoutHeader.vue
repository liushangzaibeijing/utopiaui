<template>
  <el-header class="header theme-bg-blue">
    <router-link to="/">
      <div class="logo el-col-10" >
        <img src="../../assets/logo3.jpg" class="image" />
        <span class="text">乌托邦</span>
      </div>
    </router-link>
    <div class="content el-col-14">
      <div class="el-col-8 el-col">
        <el-autocomplete
          v-model="state"
          :fetch-suggestions="querySearchAsync"
          placeholder="搜你想搜的"
          @select="handleSelect"
          class="el-col-22"
        ></el-autocomplete>
      </div>
      <div class="el-col-10 el-col">
        <el-menu  class="el-menu-demo "
                 mode="horizontal"  @select="handleSelect"
                 id="utopia-menu"
                 text-color="#fff"
                 active-text-color="#ffd04b">

          <template v-for="(level1, index1) in $router.options.routes" v-if="level1.menu">
          <el-menu-item
                        :index="level1.children[0].path" :key="index1">
            <i :class="level1.children[0].icon">
            </i>
            <span slot="title">
            {{$t(level1.children[0].name)}}
            </span>
          </el-menu-item>
          </template>
        </el-menu>
      </div>
    </div>

    <div class="right" v-if="!minScreen">
      <div class="right-item">
        <i class="fa fa-envelope-o fa-fw"></i>
        <el-badge :value="3" class="item"></el-badge>
      </div>
      <div class="right-item">
        {{ $t('header.themeChange') }}
        <theme-picker></theme-picker>
      </div>
      <div class="right-item" @click="clickLangue">
        <el-dropdown trigger="click" @command="changeLanguage" id="langDropDown">
          <p class="user-info">
            {{ $t('header.languageSelect') }}
            <i class="el-icon-arrow-down el-icon--right drop-icon" id="langDropIcon"></i>
          </p>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="zh-cn" :disabled="this.lang==='zh-cn'">
              {{$t('header.langZh')}}
            </el-dropdown-item>
            <el-dropdown-item command="en" :disabled="this.lang==='en'">
              {{$t('header.langEn')}}
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
      <div class="right-item">
        <el-dropdown trigger="click">
          <p class="user-info">
            {{ user_name }}<i class="fa fa-user-o" style="margin-left: 10px"></i>
          </p>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>
              <router-link to="/user/password">{{$t('header.modifyPass')}}</router-link>
            </el-dropdown-item>
            <el-dropdown-item divided @click.native="logout()">
              {{$t('header.logout')}}
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
    <div v-if="minScreen" class="right">
      <el-dropdown trigger="click" :hide-on-click="false">
        <p class="user-info">
          <i class="fa fa-user-o"></i>
        </p>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>
            {{ user_name }}
          </el-dropdown-item>
          <el-dropdown-item divided>
            {{ $t('header.themeChange') }}
            <theme-picker></theme-picker>
          </el-dropdown-item>
          <el-dropdown-item>
            <el-dropdown trigger="click" @command="changeLanguage" placement="left">
              <p class="user-info">
                {{ $t('header.languageSelect') }}
                <i class="el-icon-arrow-down el-icon--right drop-icon"></i>
              </p>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="zh-cn" :disabled="this.lang==='zh-cn'">
                  {{$t('header.langZh')}}
                </el-dropdown-item>
                <el-dropdown-item command="en" :disabled="this.lang==='en'">
                  {{$t('header.langEn')}}
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </el-dropdown-item>
          <el-dropdown-item divided @click.native="logout()">
            {{$t('header.logout')}}
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </el-header>
</template>

<script>
//引入更换主题
import ThemePicker from '@/components/ThemePicker'

export default {

  name: 'TheLayoutHeader',
  props: ['openNav'],
  components: {
    ThemePicker
  },
  data () {
    const min_screen = window.innerWidth < 768
    // const user_info = JSON.parse(sessionStorage.getItem('user-info'))
    // const user_name = user_info['name']
    const lang = localStorage.getItem('user-language') || 'zh-cn'
    return {
      user_name: "xieqx",
      langDrop: false,
      lang: lang,
      minScreen: min_screen,
      state: '',
      restaurants:[],
    }
  },
  methods: {
    navOpenToggle () {
      this.$emit('toggle-open')
    },
    changeLanguage (language) {
      localStorage.setItem('user-language', language)
      this.$i18n.locale = language
      this.lang = language
    },
    clickLangue () {
      let langDropIcon = document.getElementById('langDropIcon')
      if (this.langDrop) {
        langDropIcon.style.transform = 'rotate(0deg)'
      } else {
        langDropIcon.style.transform = 'rotate(-180deg)'
      }
      this.langDrop = !this.langDrop
    },
    loadAll() {
      return [
        { "value": "三全鲜食（北新泾店）", "address": "长宁区新渔路144号" },
        { "value": "Hot honey 首尔炸鸡（仙霞路）", "address": "上海市长宁区淞虹路661号" },
        { "value": "新旺角茶餐厅", "address": "上海市普陀区真北路988号创邑金沙谷6号楼113" },
        { "value": "泷千家(天山西路店)", "address": "天山西路438号" },
        { "value": "胖仙女纸杯蛋糕（上海凌空店）", "address": "上海市长宁区金钟路968号1幢18号楼一层商铺18-101" },
        { "value": "贡茶", "address": "上海市长宁区金钟路633号" },
        { "value": "豪大大香鸡排超级奶爸", "address": "上海市嘉定区曹安公路曹安路1685号" },
        { "value": "茶芝兰（奶茶，手抓饼）", "address": "上海市普陀区同普路1435号" },
        { "value": "十二泷町", "address": "上海市北翟路1444弄81号B幢-107" },
        { "value": "星移浓缩咖啡", "address": "上海市嘉定区新郁路817号" },
        { "value": "阿姨奶茶/豪大大", "address": "嘉定区曹安路1611号" },
        { "value": "新麦甜四季甜品炸鸡", "address": "嘉定区曹安公路2383弄55号" },
        { "value": "Monica摩托主题咖啡店", "address": "嘉定区江桥镇曹安公路2409号1F，2383弄62号1F" },
        { "value": "浮生若茶（凌空soho店）", "address": "上海长宁区金钟路968号9号楼地下一层" },
        { "value": "NONO JUICE  鲜榨果汁", "address": "上海市长宁区天山西路119号" },
        { "value": "CoCo都可(北新泾店）", "address": "上海市长宁区仙霞西路" },
        { "value": "快乐柠檬（神州智慧店）", "address": "上海市长宁区天山西路567号1层R117号店铺" },
        { "value": "Merci Paul cafe", "address": "上海市普陀区光复西路丹巴路28弄6号楼819" },
        { "value": "猫山王（西郊百联店）", "address": "上海市长宁区仙霞西路88号第一层G05-F01-1-306" },
        { "value": "枪会山", "address": "上海市普陀区棕榈路" },
        { "value": "纵食", "address": "元丰天山花园(东门) 双流路267号" },
        { "value": "钱记", "address": "上海市长宁区天山西路" },
        { "value": "壹杯加", "address": "上海市长宁区通协路" },
        { "value": "唦哇嘀咖", "address": "上海市长宁区新泾镇金钟路999号2幢（B幢）第01层第1-02A单元" },
        { "value": "爱茜茜里(西郊百联)", "address": "长宁区仙霞西路88号1305室" },
        { "value": "爱茜茜里(近铁广场)", "address": "上海市普陀区真北路818号近铁城市广场北区地下二楼N-B2-O2-C商铺" },
        { "value": "鲜果榨汁（金沙江路和美广店）", "address": "普陀区金沙江路2239号金沙和美广场B1-10-6" },
        { "value": "开心丽果（缤谷店）", "address": "上海市长宁区威宁路天山路341号" },
        { "value": "超级鸡车（丰庄路店）", "address": "上海市嘉定区丰庄路240号" },
        { "value": "妙生活果园（北新泾店）", "address": "长宁区新渔路144号" },
        { "value": "香宜度麻辣香锅", "address": "长宁区淞虹路148号" },
        { "value": "凡仔汉堡（老真北路店）", "address": "上海市普陀区老真北路160号" },
        { "value": "港式小铺", "address": "上海市长宁区金钟路968号15楼15-105室" },
        { "value": "蜀香源麻辣香锅（剑河路店）", "address": "剑河路443-1" },
        { "value": "北京饺子馆", "address": "长宁区北新泾街道天山西路490-1号" },
        { "value": "饭典*新简餐（凌空SOHO店）", "address": "上海市长宁区金钟路968号9号楼地下一层9-83室" },
        { "value": "焦耳·川式快餐（金钟路店）", "address": "上海市金钟路633号地下一层甲部" },
        { "value": "动力鸡车", "address": "长宁区仙霞西路299弄3号101B" },
        { "value": "浏阳蒸菜", "address": "天山西路430号" },
        { "value": "四海游龙（天山西路店）", "address": "上海市长宁区天山西路" },
        { "value": "樱花食堂（凌空店）", "address": "上海市长宁区金钟路968号15楼15-105室" },
        { "value": "壹分米客家传统调制米粉(天山店)", "address": "天山西路428号" },
        { "value": "福荣祥烧腊（平溪路店）", "address": "上海市长宁区协和路福泉路255弄57-73号" },
        { "value": "速记黄焖鸡米饭", "address": "上海市长宁区北新泾街道金钟路180号1层01号摊位" },
        { "value": "红辣椒麻辣烫", "address": "上海市长宁区天山西路492号" },
        { "value": "(小杨生煎)西郊百联餐厅", "address": "长宁区仙霞西路88号百联2楼" },
        { "value": "阳阳麻辣烫", "address": "天山西路389号" },
        { "value": "南拳妈妈龙虾盖浇饭", "address": "普陀区金沙江路1699号鑫乐惠美食广场A13" }
      ];
    },
    querySearchAsync(queryString, cb) {
      var restaurants = this.restaurants;
      var results = queryString ? restaurants.filter(this.createStateFilter(queryString)) : restaurants;

      clearTimeout(this.timeout);
      this.timeout = setTimeout(() => {
        cb(results);
      }, 3000 * Math.random());
    },
    createStateFilter(queryString) {
      return (restaurant) => {
        return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
      };
    },
    handleSelect(index) {
      console.log(index);
      this.$router.push(index)
    },

    showRouters() {
      let routes = this.$router.options.routes[0].children;

      routes.forEach(function(item,index){
        console.log(item.path);
        console.log(item.name);
        console.log(item.icon);
      });
      console.log(routes);
    },
  },
  mounted() {
    this.restaurants = this.loadAll();
    this.showRouters();
  }
}
</script>

<style scoped lang="scss">
.header {
  color: #ffffff;
  line-height: 60px;
  user-select: none;
  div {
    display: inline-block;
  }
  .logo {
    width: 240px;
    border-right: 1px solid #C0C4CC;
    text-align: center;
    font-size: 25px;
    cursor: pointer;
    .image {
      width: 50px;
      height: 50px;
      vertical-align: middle;
    }
  }
  .logo-hide {
    width: 65px;
    /*.text {*/
    /*  display: none;*/
    /*}*/
  }
  .content {
    padding: 0 20px;
    .toggle {
      font-size: 14px;
      cursor: pointer;
    }
  }
  .right {
    float: right;
    .right-item {
      display: inline-block;
      padding: 0 10px;
      min-width: 60px;
      text-align: center;
      font-size: 14px;
      cursor: pointer;
      .drop-icon {
        transition: transform 0.2s;
      }
    }
    .right-item:hover {
      background-color: rgba(255, 255, 255, 0.3);
    }
    .user-info {
      color: #ffffff;
    }
  }
}

@media (max-width: 768px) {
  .header {
    .logo {
      border: none;
    }
    .content {
      float: left;
      margin-left: -20px;
    }
  }
}
</style>
