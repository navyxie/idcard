# 校验身份证[第二代]合法性，获取身份证详细信息

[![Build Status via Travis CI](https://travis-ci.org/navyxie/idcard.svg?branch=master)](https://travis-ci.org/navyxie/idcard) [![Coverage Status](https://coveralls.io/repos/github/navyxie/idcard/badge.svg?branch=master)](https://coveralls.io/github/navyxie/idcard?branch=master) [![NPM version](https://badge.fury.io/js/idcard.png)](http://badge.fury.io/js/idcard)

### 安装:npm install idcard

## [API](#API)

[`verify`](#verify)

[`info`](#info)

[`generateIdcard`](#generateIdcard)

[`constellation`](#constellation)

[`getAge`](#getAge)

[`upgrade15To18`](#upgrade15To18)

<a name="verify" />
verify:校验身份证合法性，返回boolean值

```js
var idCard = require('idcard');
/**
* param:idcard(string)
* return boolean
*/
idCard.verify('440882199100201232');//false
```

<a name="info" />
info:获取身份证详细信息，返回一个json对象，key:valid为boolean值，代表身份证是否合法。

```js
var idCard = require('idcard');
/**
* param:idcard(string)
* return object
*/
idCard.info('440882199100201232');
```
**返回结果：**

```js
//身份证合法时返回的数据结构
{ 
	valid: true,//身份证是否合法的标志
	gender: 'M',//M->男，F->女
	birthday: 19910210,//
	province: {
		code: '440000',//行政区域编码
		text: '广东省' 
	},
	city: { 
		code: '440800', 
		text: '湛江市' 
	},
	area: { 
		code: '440882', 
		text: '雷州市' 
	},
	cardType: 1,//身份证类型，1->大陆，2->港澳台
	cardText: '大陆',
	address: '广东省湛江市雷州市',
	age:24,
	constellation:'水瓶'//星座 
}
//身份证非法时返回的数据结构
{
	valid: false
}
```

<a name="generateIdcard" />
generateIdcard:随机生成一个合法身份证号码，返回身份证号码

```js
var idCard = require('idcard');
/**
* return string
*/
idCard.generateIdcard();//返回随机身份证号码
```

<a name="constellation" />
constellation:根据生日返回星座

```js
var idCard = require('idcard');
/**
* return string
*/
idCard.constellation(19910210);//水瓶
idCard.constellation('1991/02/10','/');//水瓶
```

<a name="getAge" />
getAge:根据生日返回年龄

```js
var idCard = require('idcard');
/**
* return number
*/
idCard.getAge(19910210);//25 (调用时的日期：2016/03/23)
```

<a name="upgrade15To18" />
upgrade15To18:身份证15位升级到18位

```js
var idCard = require('idcard');
/**
* return Object
*/
var result = idCard.upgrade15To18(422201720809227);
result结构:
{
	code: 0,
	msg: '身份证15位升级到18位成功',
	card: '18位的身份证'
}
```


### 身份证中第十八位数字的计算方法

- 将前面的身份证号码17位数分别乘以不同的系数。从第一位到第十七位的系数分别为：7、9、10、5、8、4、2、1、6、3、7、9、10、5、8、4、2； 
- 将这17位数字和系数相乘的结果相加； 
- 用加出来和除以11，看余数是多少
- 余数只可能有0 、1、 2、 3、 4、 5、 6、 7、 8、 9、 10这11个数字。其分别对应的最后一位身份证的号码为1、0、X、9、8、7、6、5、4、3、2； 
- 通过上面得知如果余数是2，就会在身份证的第18位数字上出现罗马数字的Ⅹ。如果余数是10，身份证的最后一位号码就是2。
- 第一代身份证十五位数升为第二代身份证十八位数:第一步，在原十五位数身份证的第六位数后面插入19 ，这样身份证号码即为十七位数；第二步，按照国家规定的统一公式计算出第十八位数，作为校验码放在第二代身份证的尾号。

*身份证倒数第二位：偶数性别为女，奇数为男*


### 更新区域代码脚本 (4.1.0)
1. 将上一个版本的area.json, city.json, province.json, 拷贝到province_city_area_code.js文件中的provinces, citys, areas变量
2. node bin/get_gov_data.js http://www.mca.gov.cn/article/sj/tjbz/a/2017/201801/201801151447.html (此步骤自动爬取相应链接区域代码并添加到history文件夹内, 链接替换为相应年份的区域代码网址)
2. node bin/gen_gov_data.js (此步骤将history文件夹内所有code汇总成一份govCode.json文件)
3. node bin/gen_area_data.js (注意, 此脚本会覆盖原先的json文件, 请先做好备份)
4. node bin/checkDiff.js可以看到更新情况

## 版本更新
- 4.1.0 更新自动化脚本, 更改更新区域代码步骤, 新增history文件夹, 保留历史(1980~????)以来***所有***行政区域代码
- 4.0.0 区域代码更新自动化，感谢[SwenChan](https://github.com/SwenChan)同学贡献代码
- 3.4.0 升级行政区域代码, 同时将行政区域代码抽出, 独立为三个文件([province](./lib/data/province.json), [city.json](./lib/data/city.json), [area.json](./lib/data/area.json)), 添加[增量更新脚本](./bin/gen_area_data.js)
- 3.3.1 升级行政区划代码至2016年7月31日
- 3.3.0 新增接口upgrade15To18,用于将15身份证升级到18位
- 3.2.0 新增接口getAge,用于返回年龄
- 3.1.0 info接口增加返回星座，新增接口constellation，用于获取星座
- 3.0.0 更新地级市和县级市的行政区域代码，同时将[行政区域代码](./lib/province_city_area_code.js)独立出来。
- 2.0.0 版本完善info接口，对于身份证校验不准确时也返回相应的归属地信息。

**附录：行政区域代码**

- [中华人民共和国国家统计局>>行政区划代码](http://www.stats.gov.cn/tjsj/tjbz/xzqhdm/)
- [全国行政区划信息查询平台](http://xzqh.mca.gov.cn/map)
- [中华人民共和国民政部](http://www.mca.gov.cn/article/sj/tjbz/a/)
