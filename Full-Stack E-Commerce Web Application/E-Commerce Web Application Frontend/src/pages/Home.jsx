import React, { useState } from "react";
import Navbar from "../components/Navbar";
import SearchBar from "../components/SearchBar";
import CategoryCard from "../components/CategoryCard";
import Slider from "../components/Slider";
import cloths from "../assets/fashion.webp";
import shoes from "../assets/shoes.avif";
import electronics from "../assets/electronics.avif";
import toys from "../assets/toys.avif";
import books from "../assets/books.jpg";
import jewellery from "../assets/makeup.jpg";
import mobile from "../assets/mobile.jpg";
import appliances from "../assets/appliances.webp";
import sports from "../assets/sports.avif";

const Home = ({
  setPage,
  cart,
  wishlist,
  setCart,
  setWishlist,
  showMessage,
  user,         
  setUser        
}) => {

  const [search, setSearch] = useState("");
  const [ratings, setRatings] = useState({});

 
  const products = [
    { id: 1, name: "Men Stylish Shirt", price: 999, discount: 30, image: "https://img.drz.lazcdn.com/static/bd/p/6f21695360a0e06db002b7a6738d1a27.jpg_720x720q80.jpg" },
    { id: 2, name: "Casual T-Shirt", price: 699, discount: 25, image: "https://markmorphy.com/cdn/shop/files/rn-image_picker_lib_temp_9ca97105-1b3f-4cef-a875-85611b9afbca.jpg?v=1742846371" },
    { id: 3, name: "Denim Jacket", price: 1499, discount: 40, image: "https://t3.ftcdn.net/jpg/03/29/42/80/360_F_329428044_moJE1F5e98gv4iOGQOnRb9LhwMIf9PWl.jpg" },
    { id: 4, name: "Hoodie", price: 1199, discount: 35, image: "https://cdn.yourdesignstore.in/uploads/yds/productImages/full/17664856566144pure-cotton-hoodies-1.jpg" },
    { id: 5, name: "Formal Shirt", price: 899, discount: 20, image: "https://images.unsplash.com/photo-1603252109303-2751441dd157" },
    { id: 6, name: "Jeans Pant", price: 1299, discount: 45, image: "https://5.imimg.com/data5/ANDROID/Default/2023/1/ML/EX/FW/107973193/product-jpeg.jpg" },
    { id: 7, name: "Sports Wear", price: 799, discount: 30, image: "https://i.pinimg.com/474x/c0/86/eb/c086eb397ace55e3d297fa9240fd95c7.jpg" },
    { id: 8, name: "Winter Jacket", price: 1999, discount: 50, image: "https://m.media-amazon.com/images/I/41b1oVj7E3L._AC_SR70_.jpg" },
    { id: 9, name: "Casual Shirt", price: 850, discount: 15, image: "https://img.freepik.com/free-photo/shirt_1203-8194.jpg?semt=ais_hybrid&w=740&q=80" },
    { id: 10, name: "Printed T-Shirt", price: 599, discount: 20, image: "https://5.imimg.com/data5/QM/DY/AU/ANDROID-90572738/product-jpeg-500x500.jpg" },
     {
    id: 11,
    name: "Women Stylish Dress",
    price: 1299,
    discount: 30,
    image: "https://media.istockphoto.com/id/1346354625/photo/horizontal-portrait-of-a-beautiful-blonde-woman-protecting-her-eyes-with-hand-on-a-sunny-day.jpg?s=612x612&w=0&k=20&c=9vmVoFODs5gcO7JUteMz4YYzo6zIUM9YDl_NlNRa0Tc="
  },
  {
    id: 12,
    name: "Casual Women Top",
    price: 799,
    discount: 25,
    image: "https://assets.myntassets.com/w_360,q_50,,dpr_2,fl_progressive,f_webp/assets/images/2025/NOVEMBER/21/0zXu6XhJ_225a7f4a221441ba93178529c975e3dc.jpg"
  },
  {
    id: 13,
    name: "Denim Jacket Women",
    price: 1599,
    discount: 40,
    image: "https://image.hm.com/assets/hm/01/22/012296fb34bf6032135318932fc106e28236b54c.jpg?imwidth=2160"
  },
  {
    id: 14,
    name: "Women Hoodie",
    price: 1199,
    discount: 35,
    image: "https://www.rockit.co.in/cdn/shop/products/2230101738-6-36_1.jpg?v=1703672424"
  },
  {
    id: 15,
    name: "Formal Women Shirt",
    price: 899,
    discount: 20,
    image: "https://assets.myntassets.com/assets/images/2024/OCTOBER/17/istWZkll_1c48000f81b047cdbeab827dea577885.jpg"
  },
  {
    id: 16,
    name: "Women Jeans",
    price: 1399,
    discount: 45,
    image: "https://static.aceomni.cmsaceturtle.com/prod/product-image/aceomni/Wrangler/Monobrand/WWJN001095/WWJN001095_1.jpg"
  },
  {
    id: 17,
    name: "Party Wear Dress",
    price: 1999,
    discount: 30,
    image: "https://24thspoke.in/cdn/shop/files/1706969499381.jpg?v=1716824689"
  },
  {
    id: 18,
    name: "Winter Women Jacket",
    price: 1899,
    discount: 50,
    image: "https://contents.mediadecathlon.com/p2687616/580497e3b6682088c5e606f527592199/p2687616.jpg"
  },
  {
    id: 19,
    name: "Women Kurti",
    price: 999,
    discount: 15,
    image: "https://vnhnaiduhall.com/cdn/shop/files/MythriRayonKurtiforWomen_RegularFitEmbroideredKurtiwithRoundNeckV-NotchEverydayWearKurta-RS09_2.jpg?v=1775308919&width=1000"
  },
  {
    id: 20,
    name: "Printed Women T-Shirt",
    price: 599,
    discount: 20,
    image: "https://assets.ajio.com/medias/sys_master/root/20241108/edCP/672db036f9b8ef490b0c43ae/-473Wx593H-443049969-mint-MODEL.jpg"
  },
  {
    id: 21,
    name: "Kids T-Shirt",
    price: 499,
    discount: 20,
    image: "https://wyo.in/cdn/shop/files/Follow-Your-Dreams-Kids-T-Shirt-2.jpg?v=1751010616"
  },
  {
    id: 22,
    name: "Kids Hoodie",
    price: 799,
    discount: 25,
    image: "https://fullyfilmy.in/cdn/shop/files/THE-BOYS-HOODIE.jpg?v=1747991175"
  },
  {
    id: 23,
    name: "Kids Denim Jacket",
    price: 999,
    discount: 30,
    image: "https://popupkids.in/cdn/shop/files/j4_1024x1024.jpg?v=1728453110"
  },
  {
    id: 24,
    name: "Kids Winter Wear",
    price: 1199,
    discount: 35,
    image: "https://i5.walmartimages.com/seo/Winter-Thicken-Kids-Jackets-For-Girls-Coats-Warm-Girl-Jackets-Jackets-Hooded-Outerwear-Infant-3-4-5-6-7-8Yrs-Children-Clothes_69d2a388-71a1-442a-8eb3-943b3640ee4e.82a7c17b4cc42d8d47c1a4bf05d0b7a2.jpeg"
  },
  {
    id: 25,
    name: "Kids Shirt",
    price: 599,
    discount: 15,
    image: "https://www.mumkins.in/cdn/shop/products/601e27d227258.jpg?v=1757574845"
  },
  {
    id: 26,
    name: "Kids Jeans",
    price: 899,
    discount: 40,
    image: "https://www.mumkins.in/cdn/shop/products/jeans-for-boys-bl062241c-blue-1.jpg?v=1757575285"
  },
  {
    id: 27,
    name: "Kids Party Dress",
    price: 1299,
    discount: 30,
    image: "https://assets.myntassets.com/dpr_1.5,q_30,w_400,c_limit,fl_progressive/assets/images/2026/MARCH/20/SetIq94W_425ccc81f9f94ea883cf602e4413da32.jpg"
  },
  {
    id: 28,
    name: "Kids Sports Wear",
    price: 699,
    discount: 20,
    image: "https://cpimg.tistatic.com/6308630/b/1/kids-cotton-sports-wear-dress.jpg"
  },
  {
    id: 29,
    name: "Kids Sweater",
    price: 799,
    discount: 25,
    image: "https://littlesurprisebox.com/cdn/shop/products/navy-multi-space-rocket-cardiganwarmersweater-for-toddlers-kidslittle-surprise-box-991379.jpg?v=1737978401&width=1946"
  },
  {
    id: 30,
    name: "Kids Printed T-Shirt",
    price: 399,
    discount: 10,
    image: "https://tiimg.tistatic.com/fp/1/008/104/kids-printed-round-neck-modern-style-half-sleeve-cotton-t-shirts-607.jpg"
  },
   {
    id: 1,
    name: "Nike Running Shoes",
    price: 2999,
    discount: 30,
    image: "https://cdn.plutosport.com/a/ProductMedia/Nike/P.NIKE.RSH.5248/FN0228-001_g1.jpg?profile=max_width_mobile"
  },
  {
    id: 2,
    name: "Adidas Sports Shoes",
    price: 2499,
    discount: 25,
    image: "https://m.media-amazon.com/images/I/61V6DePLiPL._AC_UY1000_.jpg"
  },
  {
    id: 3,
    name: "Puma Casual Shoes",
    price: 1999,
    discount: 40,
    image: "https://sportsstation.in/cdn/shop/files/original-imahfqz7krddghaa.jpg?v=1756101844&width=693"
  },
  {
    id: 4,
    name: "White Sneakers",
    price: 1799,
    discount: 35,
    image: "https://assets.ajio.com/medias/sys_master/root1/20251128/8usQ/692957b38945db77cff66309/-473Wx593H-700210348-white-MODEL.jpg"
  },
  {
    id: 5,
    name: "Black Formal Shoes",
    price: 3499,
    discount: 20,
    image: "https://assets.ajio.com/medias/sys_master/root/20240125/s47H/65b264cd16fd2c6e6ac1b004/-473Wx593H-467012308-black-MODEL.jpg"
  },
  {
    id: 6,
    name: "Running Sneakers",
    price: 2200,
    discount: 30,
    image: "https://img.tatacliq.com/images/i25//437Wx649H/MP000000023366228_437Wx649H_202507111515061.jpeg"
  },
  {
    id: 7,
    name: "Gym Training Shoes",
    price: 2700,
    discount: 25,
    image: "https://preview.thenewsmarket.com/Previews/RBOK/StillAssets/1920x1080/708337_v2.jpg"
  },
  {
    id: 8,
    name: "High Top Sneakers",
    price: 3100,
    discount: 15,
    image: "https://fausto.in/cdn/shop/files/FST_FJLMC-15001_GREY_7_ee3e0510-aee4-4b76-ace9-e6e9d36268da_400x.jpg?v=1734682121"
  },
  {
    id: 9,
    name: "Canvas Shoes",
    price: 1500,
    discount: 10,
    image: "https://static.yourprint.in/new-admin-ajax.php?action=resize_outer_image&cfcache=all&url=med-s3/yP-mplace/Shoes/YPB094YNSBSL_1.jpg&resizeTo=600"
  },
  {
    id: 10,
    name: "Walking Shoes",
    price: 1800,
    discount: 20,
    image: "https://images-static.nykaa.com/media/catalog/product/0/8/08b6f1c22L-996BLK-PEACH_1.jpg?tr=w-500"
  },
  {
    id: 11,
    name: "Stylish Sneakers",
    price: 2600,
    discount: 30,
    image: "https://images.unsplash.com/photo-1608231387042-66d1773070a5"
  },
  {
    id: 12,
    name: "Sports Running Shoes",
    price: 2800,
    discount: 35,
    image: "https://images.unsplash.com/photo-1549298916-b41d501d3772"
  },
  {
    id: 13,
    name: "Men Casual Sneakers",
    price: 2100,
    discount: 25,
    image: "https://tiimg.tistatic.com/fp/1/007/684/sturdy-construction-slip-resistance-red-black-white-casual-wear-mens-sneaker-shoes-290.jpg"
  },
  {
    id: 14,
    name: "Lightweight Shoes",
    price: 1900,
    discount: 20,
    image: "https://assets.myntassets.com/h_1440,q_75,w_1080/v1/assets/images/25921932/2023/12/26/70f4280e-8a44-4713-ad9b-5da4e5fefebe1703577803463-Skechers-Men-Sports-Shoes-2441703577803175-1.jpg"
  },
  {
    id: 15,
    name: "Premium Sneakers",
    price: 4000,
    discount: 30,
    image: "https://bersache.com/cdn/shop/files/5_0000_IMG_5001_JPG.jpg?v=1754653790&width=2048"
  },
  {
    id: 16,
    name: "Outdoor Sports Shoes",
    price: 2300,
    discount: 15,
    image: "https://assets.myntassets.com/w_200,q_50,,dpr_3,fl_progressive,f_webp/assets/images/2026/JANUARY/29/VmSh792r_1492be52754140d89968d15d0e59a221.jpg"
  },
  {
    id: 17,
    name: "Classic White Shoes",
    price: 1700,
    discount: 20,
    image: "https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb"
  },
  {
    id: 18,
    name: "Trendy Sneakers",
    price: 3200,
    discount: 35,
    image: "https://fausto.in/cdn/shop/files/FSTSNK-12GREY_MoodShot_1_400x.jpg?v=1716974357"
  },
  {
    id: 19,
    name: "Running Pro Shoes",
    price: 3500,
    discount: 25,
    image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a"
  },
  {
    id: 20,
    name: "Daily Wear Shoes",
    price: 1600,
    discount: 10,
    image: "https://leatherhub.in/cdn/shop/products/8177456913.jpg?v=1693284729"
  },
  {
    id: 1,
    name: "SanDisk Cruzer Blade 64GB USB Flash Drive",
    price: 24999,
    discount: 20,
    image: "https://saboocomputers.com/wp-content/uploads/2023/10/PD_SND_32GB_CZ-50-1.jpg"
  },
  {
    id: 3,
    name: "Bluetooth Headphones",
    price: 1999,
    discount: 30,
    image: "https://m.media-amazon.com/images/I/71WqgqIJ1tL.jpg"
  },
  {
    id: 4,
    name: "Smart Watch",
    price: 4999,
    discount: 35,
    image: "https://m.media-amazon.com/images/I/61QH+Ta0QmL.jpg"
  },
  {
    id: 5,
    name: "Tablet",
    price: 18999,
    discount: 15,
    image: "https://img.global.news.samsung.com/za/wp-content/uploads/2019/08/Product-Image-Galaxy-Tab-S6-2.jpg"
  },
  {
    id: 6,
    name: "Wireless Mouse",
    price: 799,
    discount: 20,
    image: "https://m.media-amazon.com/images/I/61iw9q2FAVL.jpg"
  },
  {
    id: 7,
    name: "Gaming Keyboard",
    price: 2999,
    discount: 25,
    image: "https://rukminim2.flixcart.com/image/480/640/xif0q/keyboard/desktop-keyboard/w/l/6/gaming-keyboard-with-87-keys-rgb-backlit-with-suspension-keys-original-imagzcgwtrabgjna.jpeg?q=90"
  },
  {
    id: 8,
    name: "LED Monitor",
    price: 12999,
    discount: 30,
    image: "https://www.simplyshopping.in/cdn/shop/products/71UhJp4kTIL._SL1500_2048x.jpg?v=1626840159"
  },
  {
    id: 9,
    name: "Bluetooth Speaker",
    price: 2499,
    discount: 20,
    image: "https://www.sencor.com/getmedia/6770caad-d0be-4d0d-b5f0-01bbc4c1c555/35059169.jpg.aspx?width=2100&height=2100&ext=.jpg"
  },
  {
    id: 10,
    name: "Power Bank",
    price: 1499,
    discount: 15,
    image: "https://m.media-amazon.com/images/I/7110HiY3I6L._AC_SL1500_.jpg"
  },
  {
    id: 11,
    name: "DSLR Camera",
    price: 45999,
    discount: 18,
    image: "https://cdn.pixelbin.io/v2/catalog-cloud/ccprod/original/products/assets/item/free/original/9ed3c718-4851-4eab-b2c6-cc84425c54c1.jpeg"
  },
  {
    id: 12,
    name: "Action Camera",
    price: 9999,
    discount: 22,
    image: "https://ausha.co.in/cdn/shop/files/A_71621229-3504-4aad-9681-d019d91122eb.jpg?v=1724910869"
  },
  {
    id: 13,
    name: "USB Flash Drive",
    price: 699,
    discount: 10,
    image: "https://m.media-amazon.com/images/I/71ULtE83xWL.jpg"
  },
  {
    id: 14,
    name: "External Hard Drive",
    price: 3999,
    discount: 20,
    image: "https://www.minitool.com/images/uploads/2019/06/external-hard-disk-1.png"
  },
  {
    id: 15,
    name: "Router",
    price: 1999,
    discount: 25,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfJO6fNhFLCZ-RgVLUqiAS5__iZWHjEhe7bw&s"
  },
  {
    id: 16,
    name: "Projector",
    price: 14999,
    discount: 30,
    image: "https://zebronics.com/cdn/shop/files/zeb-pixaplay-55-pic1.jpg?v=1717845375&width=2048"
  },
  {
    id: 17,
    name: "Smart TV",
    price: 39999,
    discount: 28,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-PSBG6r7cyjsEvTCEmMxvGs6txs34ULjpJQ&s"
  },
  {
    id: 18,
    name: "Earbuds",
    price: 2999,
    discount: 35,
    image: "https://m.media-amazon.com/images/I/51GEDaBzrwL.jpg"
  },
  {
    id: 19,
    name: "Charging Cable",
    price: 499,
    discount: 10,
    image: "https://shop.lripl.com/cdn/shop/files/2_40d65002-5035-47b8-9550-2bc7616ae4a0.jpg?v=1719659486&width=1000"
  },
  {
    id: 20,
    name: "Gaming Console",
    price: 49999,
    discount: 15,
    image: "https://in.store.asus.com/media/catalog/product/a/l/ally_x_black_01_1.png"
  },
  {
    id: 21,
    name: "boAt WCD QC3.0 Fast Charger",
    price: 49999,
    discount: 15,
    image: "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcQerbCBGaP6EUOBkbJZgN0aXzrFlafymNiwxgOa1gLoPaDkmaXaBZnw2mhGdE5J7r4VWIhVnFJAT-igchVyrfe2wNLV7hVqY7kOkJlMv4eexg7eu5WNv6Ai"
  },
  { id: 1, name: "Toy Car", price: 499, discount: 20, image: "https://m.media-amazon.com/images/I/61zQbBw-1OL.jpg" },
  { id: 2, name: "Teddy Bear", price: 699, discount: 25, image: "https://m.media-amazon.com/images/I/61fwcBkXVOL._AC_UF1000,1000_QL80_.jpg" },
  { id: 3, name: "Building Blocks", price: 899, discount: 30, image: "https://www.jaqueslondon.co.uk/cdn/shop/products/BuildingBlocks-WoodenStackingBlocksForKids-90219.jpg?v=1629795416" },
  { id: 4, name: "Remote Control Car", price: 1299, discount: 15, image: "https://m.media-amazon.com/images/I/71LMTdb2egL.jpg" },
  { id: 5, name: "Toy Train", price: 999, discount: 20, image: "https://i5.walmartimages.com/asr/b831b833-d357-46b6-9559-f9cb3cb5e16d.b5a74b61a0fc40361c15d4781046044f.jpeg" },
  { id: 6, name: "Doll Set", price: 799, discount: 18, image: "https://cdn.fynd.com/v2/falling-surf-7c8bb8/fyprod/wrkr/products/pictures/item/free/original/barbie/494613495/0/MMHQvRjwbs-494613495-1_5013.webp?dpr=1" },
  { id: 7, name: "Puzzle Game", price: 599, discount: 22, image: "https://m.media-amazon.com/images/I/71oLIqj59GL._AC_UF1000,1000_QL80_.jpg" },
  { id: 8, name: "Lego City", price: 1499, discount: 30, image: "https://mayatoys.in/wp-content/uploads/2023/03/L60330-1.jpg" },
  { id: 9, name: "Action Figure", price: 899, discount: 25, image: "https://bearhugs.in/cdn/shop/files/buy-demon-slayer-akaza-action-figure-26-cm-at-bear-hugs-87017.webp?v=1771062096" },
  { id: 10, name: "Toy Helicopter", price: 1199, discount: 20, image: "https://sellet.in/wp-content/uploads/2021/12/IMG20211210222331.jpg" },
  { id: 11, name: "Rubik Cube", price: 399, discount: 10, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTCdRT_QCL7vLtSs826Y0FAhIk_NrnTVXidkg&s" },
  { id: 12, name: "Soft Toy Panda", price: 699, discount: 28, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHsvw6WyjBS33T6BlMdiHTWEtaoiAFgcUz1w&s" },
  { id: 13, name: "Toy Gun", price: 499, discount: 15, image: "https://www.bbassets.com/media/uploads/p/l/40327370_1-toy-cloud-dart-rotating-drum-gun-manual-attacker-soft-foam-dart-blaster-with-6-dart-barrel-for-rapid-fire-fun-ideal-gun-toys-for-kids-ages-above-8-years.jpg" },
  { id: 14, name: "Board Game", price: 999, discount: 20, image: "https://www.mystore.in/s/62ea2c599d1398fa16dbae0a/g/694936f76e0035908fda53aa/classicchowkabara7house-1-640x640.png" },
  { id: 15, name: "Kids Drum Set", price: 1299, discount: 25, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqbMK2mpFYnto-6u4Lw92gHJeZhCoD0lDJng&s" },
  { id: 16, name: "Toy Kitchen Set", price: 1599, discount: 30, image: "https://m.media-amazon.com/images/I/81lSlrKGJjL.jpg" },
  { id: 17, name: "Toy Robot", price: 1799, discount: 20, image: "https://m.media-amazon.com/images/I/71xxDNZKl5L._AC_UF1000,1000_QL80_.jpg" },
  { id: 18, name: "Stuffed Elephant", price: 899, discount: 22, image: "https://m.media-amazon.com/images/I/81ITRk-GeeL._AC_UF1000,1000_QL80_.jpg" },
  { id: 19, name: "Toy Bike", price: 1999, discount: 18, image: "https://m.media-amazon.com/images/I/61BcQ14EFGL.jpg" },
  { id: 20, name: "Magic Kit", price: 799, discount: 27, image: "https://m.media-amazon.com/images/I/815xxtMnU9L.jpg" },
  { id: 1, name: "The Lost Kingdom", price: 499, discount: 20, image: "https://m.media-amazon.com/images/I/71rrPVH-xFL._AC_UF1000,1000_QL80_.jpg" },
  { id: 2, name: "Mystery of the Night", price: 599, discount: 25, image: "https://m.media-amazon.com/images/I/81OHVFFv5HL._AC_UF1000,1000_QL80_.jpg" },
  { id: 3, name: "Adventure Island", price: 699, discount: 30, image: "https://m.media-amazon.com/images/I/71cDeRRWdhL._AC_UF1000,1000_QL80_.jpg" },
  { id: 4, name: "Hidden Treasure", price: 549, discount: 18, image: "https://m.media-amazon.com/images/I/913jk-B+tZL._AC_UF1000,1000_QL80_.jpg" },
  { id: 5, name: "The Last Journey", price: 650, discount: 22, image: "https://d28hgpri8am2if.cloudfront.net/book_images/onix/cvr9781398538665/the-last-journey-9781398538665_hr.jpg" },
  { id: 6, name: "Superhero Saga", price: 399, discount: 20, image: "https://images.booksense.com/images/336/311/9798228311336.jpg" },
  { id: 7, name: "Spider Hero Comics", price: 499, discount: 25, image: "https://m.media-amazon.com/images/I/91B9-aW14+L._AC_UF1000,1000_QL80_.jpg" },
  { id: 8, name: "Avengers Action", price: 599, discount: 30, image: "https://m.media-amazon.com/images/I/91E25ncbxnL._AC_UF1000,1000_QL80_.jpg" },
  { id: 9, name: "Batman Returns", price: 549, discount: 18, image: "https://m.media-amazon.com/images/I/91oin8sPg6L._UF1000,1000_QL80_.jpg" },
  { id: 10, name: "Comic Adventures", price: 450, discount: 22, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRcZNQZlgIGxl50U2ilcdc-mDOCaTSCmoPH7A&s" },
  { id: 11, name: "ABC Learning Book", price: 299, discount: 15, image: "https://m.media-amazon.com/images/I/715JYTHw2jL._AC_UF1000,1000_QL80_.jpg" },
  { id: 12, name: "Coloring Book", price: 199, discount: 20, image: "https://m.media-amazon.com/images/I/71imzfqxcJL._AC_UF1000,1000_QL80_.jpg" },
  { id: 13, name: "Bedtime Stories", price: 399, discount: 25, image: "https://m.media-amazon.com/images/I/911m3tKg15L._AC_UF1000,1000_QL80_.jpg" },
  { id: 14, name: "Numbers & Shapes", price: 249, discount: 18, image: "https://m.media-amazon.com/images/I/71ymk+jJI0L._AC_UF1000,1000_QL80_.jpg" },
  { id: 15, name: "Kids Fun Stories", price: 350, discount: 22, image: "https://m.media-amazon.com/images/I/81NtiolE9GL._AC_UF1000,1000_QL80_.jpg" },
  { id: 16, name: "React JS Guide", price: 799, discount: 30, image: "https://theroadtoenterprise.com/images/react-typescript-edition.png" },
  { id: 17, name: "JavaScript Mastery", price: 899, discount: 25, image: "https://m.media-amazon.com/images/I/71lBExcZLZL._UF1000,1000_QL80_.jpg" },
  { id: 18, name: "Python Programming", price: 999, discount: 35, image: "https://m.media-amazon.com/images/I/61ViPUXS8ZL._AC_UF1000,1000_QL80_.jpg" },
  { id: 19, name: "Full Stack Dev", price: 1299, discount: 28, image: "https://m.media-amazon.com/images/I/61jcXMvVUKL._UF1000,1000_QL80_.jpg" },
  { id: 20, name: "Data Structures", price: 899, discount: 22, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRosT3G2e2_wIjbwO_E19MUEIjgvogasqJvFA&s" },
  { id: 1, name: "Lipstick", price: 499, discount: 20, image: "https://ibacosmetics.com/cdn/shop/products/iba-pure-lips-long-stay-matte-lipstick---m13-pink-rose_1_1_aa73a0e7-c78a-41f3-8b4b-c7796847505e.png?v=1630582063&width=800" },
  { id: 2, name: "Foundation", price: 899, discount: 25, image: "https://www.maybelline.co.in/-/media/project/loreal/brand-sites/mny/apac/in/products/face/foundation/fitme-matte-and-poreless-foundation/modules/product-info/230-natural-buff/fmt-bottle_230.jpg?rev=33ef371d8035472d832d71497b2968f6&cx=0&cy=0&cw=315&ch=472&hash=8EAC69651BEEA8CF1FA9696A8E547BD2" },
  { id: 3, name: "Face Powder", price: 699, discount: 30, image: "https://m.media-amazon.com/images/I/61HK1LAqaoL.jpg" },
  { id: 4, name: "Eye Liner", price: 299, discount: 15, image: "https://goodchoiceindia.com/cdn/shop/files/EL05_30b2a7ac-eec3-4e7d-b050-c57554fb7d1f.jpg?v=1736945263" },

  { id: 5, name: "Mascara", price: 599, discount: 20, image: "https://static.beautytocare.com/cdn-cgi/image/f=auto/media/catalog/product/m/a/maybelline-lash-sensational-washable-mascara-very-black-9-5ml.png" },
  { id: 6, name: "Blush", price: 499, discount: 22, image: "https://revolutionbeauty.in/cdn/shop/files/5057566865128_1.jpg?v=1754899422" },
  { id: 7, name: "Highlighter", price: 799, discount: 28, image: "https://www.paccosmetics.com/cdn/shop/files/8904341201022_IMG.other1.jpg?v=1718017165&width=1500" },
  { id: 8, name: "Concealer", price: 699, discount: 25, image: "https://images-static.nykaa.com/media/catalog/product/e/0/e0b44ac607845012351_1.jpg?tr=w-500" },

  { id: 9, name: "Compact Powder", price: 549, discount: 18, image: "https://images-static.nykaa.com/media/catalog/product/0/0/0060d70LAK-new_8901030366727-new_1.jpg?tr=w-500" },
  { id: 10, name: "Lip Gloss", price: 399, discount: 20, image: "https://www.dotandkey.com/cdn/shop/files/1e.jpg?v=1760127117&width=700" },
  { id: 11, name: "Eye Shadow Palette", price: 999, discount: 30, image: "https://m.media-amazon.com/images/I/61Q6VuQYNmL._AC_UF1000,1000_QL80_.jpg" },
  { id: 12, name: "Makeup Kit", price: 1499, discount: 35, image: "https://m.media-amazon.com/images/I/811PxEGuypL._AC_UF1000,1000_QL80_.jpg" },

  { id: 13, name: "BB Cream", price: 699, discount: 22, image: "https://cloudinary.images-iherb.com/image/upload/f_auto,q_auto:eco/images/loe/loe21147/l/27.jpg" },
  { id: 14, name: "CC Cream", price: 749, discount: 24, image: "https://m.media-amazon.com/images/I/51IgR2yRK2L.jpg" },
  { id: 15, name: "Makeup Brushes Set", price: 899, discount: 27, image: "https://m.media-amazon.com/images/I/410tiL4QgAL._AC_UF1000,1000_QL80_.jpg" },
  { id: 16, name: "Nail Polish", price: 199, discount: 15, image: "https://m.media-amazon.com/images/I/61bbT6ZNKpL._AC_UF1000,1000_QL80_.jpg" },

  { id: 17, name: "Primer", price: 799, discount: 26, image: "https://m.media-amazon.com/images/I/61FfGNgMGsL._AC_UF1000,1000_QL80_.jpg" },
  { id: 18, name: "Setting Spray", price: 899, discount: 25, image: "https://m.media-amazon.com/images/I/61LNZxUmSPL._AC_UF1000,1000_QL80_.jpg" },
  { id: 19, name: "Kajal", price: 249, discount: 18, image: "https://www.osheaherbals.com/cdn/shop/files/1.FOP_a01e3838-9195-4a3b-8b75-bfa7d3a7f30d.jpg?v=1742294516" },
  { id: 20, name: "Makeup Remover", price: 499, discount: 20, image: "https://i5.walmartimages.com/seo/Neutrogena-Gentle-Oil-Free-Eye-Makeup-Remover-Cleanser-8-0-fl-oz_4a9a08e1-f0cc-4bdb-a23d-c1fffd02381f.40838fc0219f77682fd7f95a5302ebe4.jpeg" },
  { id: 1, name: "iPhone 17 Pro Max Silicone Case with MagSafe – Terra Cotta", price: 69999, discount: 10, image: "https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/MGFQ4?wid=4000&hei=4000&fmt=jpeg&qlt=90&.v=1757534575976" },
  { id: 2, name: "Samsung s25 ultra", price: 59999, discount: 15, image: "https://darlingretail.com/cdn/shop/files/1_2_be316c5f-5d44-4f33-a540-80cedf642b71_800x.jpg?v=1753531706" },
  { id: 3, name: "OnePlus 11", price: 49999, discount: 20, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqQcveS_Dogo1vR8b6Il29bvM6IDPqY-i4Ig&s" },
  { id: 4, name: "Realme 12 Pro", price: 24999, discount: 25, image: "https://media.tatacroma.com/Croma%20Assets/Communication/Mobiles/Images/304506_0_vwxf1m.png" },

  { id: 5, name: "Xiaomi Redmi Note 13", price: 17999, discount: 18, image: "https://m.media-amazon.com/images/I/71VW8LmqqPL._AC_UF1000,1000_QL80_.jpg" },
  { id: 6, name: "Vivo V29", price: 32999, discount: 22, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTKM5IxpI13mDxukejySoH-1ySJKKyNN7t8JA&s" },
  { id: 7, name: "Oppo Reno 10", price: 28999, discount: 20, image: "https://img-prd-pim.poorvika.com/product/Oppo-reno-10-5g-ice-blue-256gb-8gb-ram-Front-Back-View.png" },
  { id: 8, name: "Google Pixel 7", price: 54999, discount: 12, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8FTbcd4woEvhm7PwlUUZawoh4e-wLarb1pQ&s" },

  { id: 9, name: "iPhone 14", price: 79999, discount: 8, image: "https://img-prd-pim.poorvika.com/cdn-cgi/image/width=500,height=500,quality=75/product/apple-iphone-14-pro-gold-128gb-front-and-back-view.png" },
  { id: 10, name: "Samsung A54", price: 38999, discount: 18, image: "https://img-prd-pim.poorvika.com/cdn-cgi/image/width=500,height=500,quality=75/product/samsung-galaxy-a54-5g-awesome-violet-256gb-8gb-ram-back-front-view.png" },
  { id: 11, name: "iQOO Neo 7", price: 31999, discount: 20, image: "https://rukmini1.flixcart.com/image/1500/1500/xif0q/mobile/1/d/a/neo-7-5g-i2214-iqoo-original-imagn9wdw6vqxsrv.jpeg?q=70" },
  { id: 12, name: "Motorola Edge 40", price: 27999, discount: 15, image: "https://rukmini1.flixcart.com/image/1500/1500/xif0q/mobile/j/q/2/edge-40-neo-payj0001in-motorola-original-imagtkf5ewhafvhh.jpeg?q=70" },

  { id: 13, name: "Poco X5 Pro", price: 22999, discount: 25, image: "https://rukmini1.flixcart.com/image/1500/1500/xif0q/mobile/a/x/j/-original-imagmkjfhzjhfhhe.jpeg?q=70" },
  { id: 14, name: "Samsung Z Flip 5", price: 99999, discount: 10, image: "https://m.media-amazon.com/images/I/61Tl1z+Hn0L._AC_UF1000,1000_QL80_.jpg" },
  { id: 15, name: "iPhone SE", price: 49999, discount: 12, image: "https://buy.gazelle.com/cdn/shop/files/iPhone_SE_3rd_Gen_-_RED-_Overlap_Trans-cropped.jpg?v=1757019093&width=1445" },
  { id: 16, name: "Realme Narzo 60", price: 15999, discount: 20, image: "https://www.91-img.com/pictures/157444-v5-realme-narzo-60-5g-mobile-phone-hres-14.jpg?tr=h-271,c-at_max,q-70,pr-true" },

  { id: 17, name: "Infinix Zero 30", price: 18999, discount: 22, image: "https://rukminim2.flixcart.com/image/480/640/xif0q/mobile/w/x/0/-original-imagszg3qxqgdx9c.jpeg?q=90" },
  { id: 18, name: "Asus ROG Phone 7", price: 74999, discount: 15, image: "https://dlcdnwebimgs.asus.com/gain/A16F8224-F8F7-44F3-A1D5-A9A1AEC9F92D" },
  { id: 19, name: "Samsung M14", price: 14999, discount: 18, image: "https://m.media-amazon.com/images/I/913EiorAS0L.jpg" },
  { id: 20, name: "OnePlus Nord CE 3", price: 24999, discount: 20, image: "https://oasis.opstatics.com/content/dam/oasis/page/2023/global/product/ziti/ziti-specs-gray.png" },
  { id: 1, name: "Refrigerator", price: 24999, discount: 20, image: "https://cdn.jiostore.online/v2/jmd-asp/jdprod/wrkr/jioretailer/products/pictures/item/free/original/vTqfPDV8-C-bpl-brf-3800avss-refrigerator-492284021-1-1200wx1200h.jpeg" },
  { id: 2, name: "Washing Machine", price: 18999, discount: 25, image: "https://media-ik.croma.com/prod/https://media.tatacroma.com/Croma%20Assets/Large%20Appliances/Washers%20and%20Dryers/Images/308169_nhjiel.png" },
  { id: 3, name: "Air Conditioner", price: 32999, discount: 30, image: "https://m.media-amazon.com/images/I/71+G7Rr-cBL.jpg" },
  { id: 4, name: "Microwave Oven", price: 7999, discount: 35, image: "https://www.electrolux.in/globalassets/support/faq/microwave-faq-640x640.jpg?width=464" },

  { id: 5, name: "Mixer Grinder", price: 2999, discount: 15, image: "https://m.media-amazon.com/images/I/61arz2nJBbL._AC_UF894,1000_QL80_.jpg" },
  { id: 6, name: "Electric Kettle", price: 1499, discount: 20, image: "https://www.bbassets.com/media/uploads/p/l/40317802_2-wonderchef-crescent-electric-kettle.jpg" },
  { id: 7, name: "Ceiling Fan", price: 2499, discount: 25, image: "https://ankurelectricals.com/cdn/shop/files/1_9914d9e5-393b-450b-b69c-317cc1285647.png?v=1729681211" },
  { id: 8, name: "Water Purifier", price: 10999, discount: 30, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTysjB86EU08Y1vuDKRhgRezvVdfEC47XFXSw&s" },

  { id: 9, name: "Induction Stove", price: 1999, discount: 20, image: "https://www.lifelongindiaonline.com/cdn/shop/files/1._Image_9867d677-79a8-43d7-bb20-169747f5a3c8.jpg?v=1752144826" },
  { id: 10, name: "Electric Iron", price: 1299, discount: 15, image: "https://m.media-amazon.com/images/I/510o881zPLL._AC_UF894,1000_QL80_.jpg" },
  { id: 11, name: "Vacuum Cleaner", price: 4999, discount: 25, image: "https://m.media-amazon.com/images/I/51-NgiUucAL._AC_UF894,1000_QL80_.jpg" },
  { id: 12, name: "Dishwasher", price: 35999, discount: 30, image: "https://img-prd-pim.poorvika.com/cdn-cgi/image/width=500,height=500,quality=75/product/bosch-series-6-15-place-settings-dishwasher-sms6hmi00i-silver-inox-front-view.png" },

  { id: 13, name: "Smart TV", price: 42999, discount: 20, image: "https://amstradworld.com/wp-content/uploads/2023/12/Amstrad-AM65UWGTA-WebOS-TV_front.jpg" },
  { id: 14, name: "Room Heater", price: 2999, discount: 18, image: "https://longwayindia.com/cdn/shop/files/LW-Blaze-800-W-2R-Gray-P1.jpg?v=1756816467" },
  { id: 15, name: "Air Cooler", price: 8999, discount: 22, image: "https://m.media-amazon.com/images/I/71S3lGnLYuL._AC_SL1500_.jpg" },
  { id: 16, name: "Toaster", price: 1499, discount: 15, image: "https://media.tatacroma.com/Croma%20Assets/Small%20Appliances/Toasters%20Sandwich%20Makers/Images/234744_0_wtuotf.png" },

  { id: 17, name: "Juicer Mixer", price: 3499, discount: 20, image: "https://m.media-amazon.com/images/I/615eo-7xrTL._AC_UF894,1000_QL80_.jpg" },
  { id: 18, name: "Coffee Maker", price: 4999, discount: 25, image: "https://m.media-amazon.com/images/I/61w-WO4aQsL._AC_UF894,1000_QL80_.jpg" },
  { id: 19, name: "LED Bulb Set", price: 799, discount: 10, image: "https://5.imimg.com/data5/SELLER/Default/2023/4/298726843/AW/CM/OE/7093821/havells-9watt-led-bulb-for-your-home-and-office-set-of-4-.jpg" },
  { id: 20, name: "Smart Home Hub", price: 5999, discount: 20, image: "https://m.media-amazon.com/images/I/61tMoVGYglL.jpg" },
   { id: 1, name: "Cricket Bat", price: 2999, discount: 20, image: "https://cdnmedia.dsc-cricket.com/media/catalog/product/cache/5b0ea239e50527b43e3253a7f103e237/d/s/dsc-blak-65-supreme-english-willow-india-range-cricket-bat-2.webp" },
  { id: 2, name: "Football", price: 999, discount: 25, image: "https://m.media-amazon.com/images/I/81w+EoFVdEL._AC_UF894,1000_QL80_.jpg" },
  { id: 3, name: "Badminton Racket", price: 1499, discount: 30, image: "https://m.media-amazon.com/images/I/719j2lzLn2L._AC_UF1000,1000_QL80_.jpg" },
  { id: 4, name: "Tennis Ball Set", price: 799, discount: 15, image: "https://rukmini1.flixcart.com/image/1500/1500/xif0q/ball/e/f/u/270-cricket-ball-tennis-ball-box-set-pack-green-high-bounce-soft-original-imaheyjcazerugyk.jpeg?q=70" },

  { id: 5, name: "Gym Dumbbells", price: 2499, discount: 35, image: "https://m.media-amazon.com/images/I/614EYnLQaKL._AC_UF894,1000_QL80_.jpg" },
  { id: 6, name: "Yoga Mat", price: 699, discount: 20, image: "https://sppartos.com/cdn/shop/files/31VX-aIlgWL_580x.jpg?v=1702469142" },
  { id: 7, name: "Skipping Rope", price: 399, discount: 10, image: "https://www.lifelinefitness.in/wp-content/uploads/2024/02/Skipping-Rope-1-1.webp" },
  { id: 8, name: "Sports Shoes", price: 1999, discount: 40, image: "https://m.media-amazon.com/images/I/71f3BmjCwtL.jpg" },

  { id: 9, name: "Basketball", price: 1299, discount: 20, image: "https://contents.mediadecathlon.com/p3095393/32ea7227c71098e222da41c0c9d2f4bd/p3095393.jpg" },
  { id: 10, name: "Volleyball", price: 1099, discount: 15, image: "https://m.media-amazon.com/images/I/61pFab9tNeL._AC_UF894,1000_QL80_.jpg" },
  { id: 11, name: "Boxing Gloves", price: 1999, discount: 25, image: "https://contents.mediadecathlon.com/p1592998/c901b69179d40a0c2d013d8880a994f7/p1592998.jpg" },
  { id: 12, name: "Cricket Helmet", price: 1799, discount: 30, image: "https://www.brewingcricket.com/cdn/shop/files/T-Plus-Ti-BLACK_1000x.jpg-Photoroom.jpg?v=1745994273" },

  { id: 13, name: "Football Shoes", price: 2999, discount: 35, image: "https://contents.mediadecathlon.com/m20968713/6bbc76159043ca84837faca389324d36/m20968713.jpg" },
  { id: 14, name: "Sports Jersey", price: 999, discount: 20, image: "https://m.media-amazon.com/images/I/51Fk5E4852L._AC_UY1100_.jpg" },
  { id: 15, name: "Gym Gloves", price: 599, discount: 10, image: "https://strausssport.com/cdn/shop/files/71zKWjbkuyL.jpg?v=1738729805" },
  { id: 16, name: "Skipping Counter Rope", price: 899, discount: 15, image: "https://m.media-amazon.com/images/I/61Bkcx4sUeL.jpg" },

  { id: 17, name: "Badminton Shuttle Cock", price: 499, discount: 20, image: "https://m.media-amazon.com/images/I/615AczRo+aL._AC_UF894,1000_QL80_.jpg" },
  { id: 18, name: "Table Tennis Bat", price: 1299, discount: 25, image: "https://m.media-amazon.com/images/I/61pMLiRn7SL.jpg" },
  { id: 19, name: "Sports Cap", price: 399, discount: 10, image: "https://m.media-amazon.com/images/I/713ZwxZ9+TL._AC_UY1100_.jpg" },
  { id: 20, name: "Training Cones Set", price: 799, discount: 15, image: "https://nwscdn.com/media/catalog/product/cache/h900xw900/f/l/flexible-training-cones-main-new-logo.jpg" }
  ];

  const filteredProducts = products.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleRating = (id, value) => {
    setRatings({ ...ratings, [id]: value });
  };

  const addToCart = (item) => {
    const finalPrice = Math.floor(
      item.price - (item.price * item.discount) / 100
    );

    const exists = cart.find((p) => p.id === item.id);

    if (exists) {
      setCart(
        cart.map((p) =>
          p.id === item.id ? { ...p, qty: (p.qty || 1) + 1 } : p
        )
      );
    } else {
      setCart([
        ...cart,
        { ...item, price: finalPrice, qty: 1 } 
      ]);
    }

    showMessage("Item added to cart 🛒");
  };

  const toggleWishlist = (item) => {
    const exists = wishlist.some((p) => p.id === item.id);

    if (exists) {
      setWishlist(wishlist.filter((p) => p.id !== item.id));
    } else {
      setWishlist([...wishlist, item]);
    }
  };

  const categories = [
    { img: cloths, name: "Fashion", page: "fashion" },
    { img: shoes, name: "Shoes", page: "shoes" },
    { img: electronics, name: "Electronics", page: "electronics" },
    { img: toys, name: "Toys", page: "toys" },
    { img: books, name: "Books", page: "books" },
    { img: jewellery, name: "Makeup", page: "makeup" },
    { img: mobile, name: "Mobile", page: "mobile" },
    { img: appliances, name: "Appliances", page: "appliances" },
    { img: sports, name: "Sports", page: "sports" },
  ];

  return (
    <div className="home-page">

      <Navbar
        setPage={setPage}
        cart={cart}
        wishlist={wishlist}
        user={user}
        setUser={setUser}
      />

      <Slider />

      <SearchBar setSearch={setSearch} setPage={setPage} />

      {search ? (
        <>
          <h2 className="title">Search Results</h2>

          <div className="product-grid">

            {filteredProducts.length > 0 ? (
              filteredProducts.map((item) => {
                const finalPrice = Math.floor(
                  item.price - (item.price * item.discount) / 100
                );

                const isWish = wishlist.some((p) => p.id === item.id);

                return (
                  <div key={item.id} className="product-card">

                    <img src={item.image} alt={item.name} />

                    <h3>{item.name}</h3>

                    <p className="price">
                      ₹{finalPrice}
                      <span className="old-price">₹{item.price}</span>
                    </p>

                    <p className="discount">{item.discount}% OFF</p>

                    <div className="rating">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <span
                          key={star}
                          onClick={() => handleRating(item.id, star)}
                          className={
                            (ratings[item.id] || 0) >= star
                              ? "star active"
                              : "star"
                          }
                        >
                          ★
                        </span>
                      ))}
                    </div>

                    <div className="buttons">

                      <button
                        onClick={() => addToCart(item)}
                        className="cart-btn"
                      >
                        Add to Cart
                      </button>

                      <button
                        onClick={() => toggleWishlist(item)}
                        className="wish-btn"
                      >
                        {isWish ? "❤️ Saved" : "🤍 Wishlist"}
                      </button>

                    </div>

                  </div>
                );
              })
            ) : (
              <p style={{ textAlign: "center", width: "100%" }}>
                No products found
              </p>
            )}

          </div>
        </>
      ) : (
        <>
          <h2 className="title">Categories</h2>

          <div className="category-container">
            {categories.map((item, index) => (
              <div
                key={index}
                className="category-click"
                onClick={() => setPage(item.page)}
              >
                <CategoryCard img={item.img} name={item.name} />
              </div>
            ))}
          </div>
        </>
      )}

    </div>
  );
};

export default Home;