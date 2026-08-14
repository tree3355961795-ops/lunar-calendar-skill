const lunarInfo = [19416,19168,42352,21717,53856,55632,91476,22176,39632,21970,19168,42422,42192,53840,119381,46400,54944,44450,38320,84343,18800,42160,46261,27216,27968,109396,11104,38256,21234,18800,25958,54432,59984,28309,23248,11104,100067,37600,116951,51536,54432,120998,46416,22176,107956,9680,37584,53938,43344,46423,27808,46416,86869,19872,42416,83315,21168,43432,59728,27296,44710,43856,19296,43748,42352,21088,62051,55632,23383,22176,38608,19925,19152,42192,54484,53840,54616,46400,46496,103846,38320,18864,43380,42160,45690,27216,27968,44870,43872,38256,19189,18800,25776,29859,59984,27480,21952,43872,38613,37600,51552,55636,54432,55888,30034,22176,43959,9680,37584,51893,43344,46240,47780,44368,21977,19360,42416,86390,21168,43312,31060,27296,44368,23378,19296,42726,42208,53856,60005,54576,23200,30371,38608,19195,19152,42192,118966,53840,54560,56645,46496,22224,21938,18864,42359,42160,43600,111189,27936,44448,84835,37744,18936,18800,25776,92326,59984,27424,108228,43744,41696,53987,51552,54615,54432,55888,23893,22176,42704,21972,21200,43448,43344,46240,46758,44368,21920,43940,42416,21168,45683,26928,29495,27296,44368,84821,19296,42352,21732,53600,59752,54560,55968,92838,22224,19168,43476,41680,53584,62034,54560];
const tianGan=["甲","乙","丙","丁","戊","己","庚","辛","壬","癸"];
const diZhi=["子","丑","寅","卯","辰","巳","午","未","申","酉","戌","亥"];
const shengXiao=["鼠","牛","虎","兔","龙","蛇","马","羊","猴","鸡","狗","猪"];
const monthName=["正","二","三","四","五","六","七","八","九","十","冬","腊"];
const dayName=["初一","初二","初三","初四","初五","初六","初七","初八","初九","初十","十一","十二","十三","十四","十五","十六","十七","十八","十九","二十","廿一","廿二","廿三","廿四","廿五","廿六","廿七","廿八","廿九","三十"];
function leapMonth(y){ return lunarInfo[y-1900]&0xf; }
function leapDays(y){ return leapMonth(y)?((lunarInfo[y-1900]&0x10000)?30:29):0; }
function monthDays(y,m){ return (lunarInfo[y-1900]&(0x10000>>m))?30:29; }
function getLunarYear(y){ let sum=348; for(let i=0x8000;i>0x8;i>>=1){ sum+=(lunarInfo[y-1900]&i)?1:0; } return sum+leapDays(y); }
function solarToLunar(y,m,d){
  let offset=(Date.UTC(y,m-1,d)-Date.UTC(1900,0,31))/86400000;
  let i,temp=0;
  for(i=1900;i<2101&&offset>0;i++){ temp=getLunarYear(i); offset-=temp; }
  if(offset<0){ offset+=temp; i--; }
  const lunarYear=i, leap=leapMonth(lunarYear);
  let isLeap=false;
  for(i=1;i<13&&offset>0;i++){
    if(leap>0&&i===(leap+1)&&!isLeap){ i--; isLeap=true; temp=leapDays(lunarYear); }
    else{ temp=monthDays(lunarYear,i); }
    if(isLeap&&i===(leap+1)) isLeap=false;
    offset-=temp;
  }
  if(offset===0&&leap>0&&i===leap+1){ if(isLeap){ isLeap=false; } else{ isLeap=true; i--; } }
  if(offset<0){ offset+=temp; i--; }
  const lunarMonth=i, lunarDay=offset+1;
  return { year:lunarYear, month:lunarMonth, day:lunarDay, isLeap:isLeap,
    ganzhi:(tianGan[(lunarYear-4)%10]+diZhi[(lunarYear-4)%12])+"年",
    shengxiao:shengXiao[(lunarYear-4)%12],
    text:(isLeap?"闰":"")+monthName[lunarMonth-1]+"月"+dayName[lunarDay-1] };
}
if (typeof require !== "undefined" && require.main === module) {
  const args=process.argv.slice(2);
  if(args.length>=3){
    const [y,m,d]=args.map(Number);
    const r=solarToLunar(y,m,d);
    console.log(y+"-"+m+"-"+d+" => 农历"+r.text+"（"+r.year+r.ganzhi+"，"+r.shengxiao+"年"+(r.isLeap?"，闰月":"")+"）");
  } else {
    const now=new Date();
    const r=solarToLunar(now.getFullYear(),now.getMonth()+1,now.getDate());
    console.log("今天 => 农历"+r.text+"（"+r.year+r.ganzhi+"，"+r.shengxiao+"年"+(r.isLeap?"，闰月":"")+"）");
  }
}
module.exports = { solarToLunar };
