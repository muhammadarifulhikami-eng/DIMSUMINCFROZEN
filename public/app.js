/**
 * Dimsum Inc Frozen — Frontend App
 * Terhubung ke Backend API aman (Express) dengan fallback Preview Lokal bila dibuka tanpa server.
 */

const FALLBACK_CATALOG = {
    "store":  {
                  "name":  "Dimsum Inc Official",
                  "username":  "dimsuminc_official",
                  "shopId":  1002650489,
                  "location":  "Kota Jakarta Selatan",
                  "tagline":  "No Pork, No Lard (Halal) • Bebas Pengawet • Kirim Instan dari Jakarta Selatan",
                  "rating":  4.9,
                  "ratingsCount":  "1.3RB+",
                  "shopeeUrl":  "https://shopee.co.id/dimsuminc_official",
                  "avatarUrl":  "https://down-id.img.susercontent.com/file/id-11134216-8224p-ml4ef6bemi9te8",
                  "endorsementVideo":  {
                                           "videoUrl":  "https://down-aka-id.vod.susercontent.com/api/v4/11110103/mms/id-11110103-6vg6o-mrazlmsaiih3cf.16000051785463200.mp4",
                                           "posterUrl":  "https://down-id.img.susercontent.com/file/sg-11134210-821dq-mgvmz9wtz37t1a"
                                       },
                  "tableSpreadImage":  "https://down-id.img.susercontent.com/file/id-11134210-81zte-mrv3ububottz73",
                  "banners":  [
                                  {
                                      "id":  "banner-1",
                                      "title":  "Authentic Premium Dimsum - Ready to Serve",
                                      "imageUrl":  "https://down-ws-id.img.susercontent.com/id-11134210-8224u-mgrsg2r9tfd6b5.webp"
                                  },
                                  {
                                      "id":  "banner-2",
                                      "title":  "Dimsum Restaurant Vibe - Ready to Enjoy Anytime Anywhere",
                                      "imageUrl":  "https://down-ws-id.img.susercontent.com/id-11134210-8224s-mgrsg2r9utxm12.webp"
                                  },
                                  {
                                      "id":  "banner-3",
                                      "title":  "Living Outside Jabodetabek - Select Delivery JNE YES",
                                      "imageUrl":  "https://down-ws-id.img.susercontent.com/id-11134210-8224p-mgrsg2r9w8i2fa.webp"
                                  },
                                  {
                                      "id":  "banner-4",
                                      "title":  "Open Hours \u0026 Delivery Cutoff Info",
                                      "imageUrl":  "https://down-ws-id.img.susercontent.com/id-11134210-8224p-mgrsg2r9xn2if5.webp"
                                  }
                              ],
                  "lat":  "-6.2615",
                  "lng":  106.8106
              },
    "products":  [
                     {
                         "id":  "22068156960",
                         "title":  "Siomay / Shiumay Dimsum Premium (12 Pcs)",
                         "category":  "Dimsum Kukus",
                         "price":  74900,
                         "packSize":  "1 Pack : 12 pcs",
                         "weightGram":  400,
                         "stock":  90,
                         "badge":  "Best Seller",
                         "image":  "https://down-id.img.susercontent.com/file/id-11134207-8224u-mkx9a4i2iwp004",
                         "shopeeUrl":  "https://shopee.co.id/Siomay-Shiumay-Siumay-Somay-Dimsum-Premium-by-Dimsum-Inc-i.1002650489.22068156960",
                         "description":  "Official Store, No Pork, No Lard! Siomay lezat perpaduan antara Daging Ayam Kampung, Udang Segar, dan Jamur. 1 Pack isi 12 pcs. Penyajian dikukus. Penyimpanan freezer tahan 1 bulan."
                     },
                     {
                         "id":  "23842671711",
                         "title":  "Hakau / Har Gao Dimsum Premium (12 Pcs)",
                         "category":  "Dimsum Kukus",
                         "price":  69900,
                         "packSize":  "1 Pack : 12 pcs",
                         "weightGram":  380,
                         "stock":  80,
                         "badge":  "Favorit",
                         "image":  "https://down-id.img.susercontent.com/file/id-11134207-82250-mgbp1he6kzre5f",
                         "shopeeUrl":  "https://shopee.co.id/Hakau-Har-Gao-Har-Gau-Dimsum-Premium-by-Dimsum-Inc-i.1002650489.23842671711",
                         "description":  "Official Store, No Pork, No Lard! Premium Har Gau Dimsum by Dimsum Inc. Udang segar pilihan dibungkus dengan adonan kulit tipis seperti kristal. 1 Pack isi 12 pcs. Penyajian dikukus. Simpan di freezer tahan 1 bulan."
                     },
                     {
                         "id":  "22942665843",
                         "title":  "Pangsit Ayam Udang / Gyoza Dimsum Premium (12 Pcs)",
                         "category":  "Dimsum Kukus",
                         "price":  69900,
                         "packSize":  "1 Pack : 12 pcs",
                         "weightGram":  380,
                         "stock":  75,
                         "badge":  "Best Seller",
                         "image":  "https://down-id.img.susercontent.com/file/id-11134207-8224p-mg4ssdb6pudkdf",
                         "shopeeUrl":  "https://shopee.co.id/Pangsit-Ayam-Udang-Gyoza-Dimsum-Premium-by-Dimsum-Inc-i.1002650489.22942665843",
                         "description":  "Pangsit Ayam Udang / Gyoza isi perpaduan daging ayam kampung dan udang cincang dalam balutan kulit gyoza lembut. Penyajian bisa dikukus atau pan-fried/digoreng."
                     },
                     {
                         "id":  "24626795659",
                         "title":  "Dimsum Bayam Udang / Cream Spinach Prawn Dumpling (12 Pcs)",
                         "category":  "Dimsum Kukus",
                         "price":  74900,
                         "packSize":  "1 Pack : 12 pcs",
                         "weightGram":  380,
                         "stock":  60,
                         "badge":  "Premium",
                         "image":  "https://down-id.img.susercontent.com/file/id-11134207-8224v-mg4xfwlh05cb2e",
                         "shopeeUrl":  "https://shopee.co.id/Dimsum-Bayam-Udang-Cream-Spinach-Prawn-Dumpling-Premium-By-Dimsum-Inc-i.1002650489.24626795659",
                         "description":  "Dumpling udang spesial berpadu bayam segar dengan tekstur lembut dan kaya rasa. Penyajian dikukus."
                     },
                     {
                         "id":  "26558891658",
                         "title":  "Siomay Mozzarella / Shiumay Keju Mozzarella Premium (12 Pcs)",
                         "category":  "Dimsum Kukus",
                         "price":  79900,
                         "packSize":  "1 Pack : 12 pcs",
                         "weightGram":  420,
                         "stock":  65,
                         "badge":  "Keju Lumer",
                         "image":  "https://down-id.img.susercontent.com/file/id-11134207-8224v-mgddkqacn2fh7e",
                         "shopeeUrl":  "https://shopee.co.id/DIMSUM-INC-Siomay-Mozarella-Shiumay-Mozzarella-Siomay-Shiumay-Siumay-Somay-Dimsum-Siomay-Keju-Keju-Cheese-Siomay-Ayam-Siomay-Udang-Siomay-Ayam-Udang-Somay-Ayam-Somay-Ayam-Somay-Ayam-Udang-Somay-Mozzarela-Premium-i.1002650489.26558891658",
                         "description":  "Siomay ayam udang premium dengan isian dan topping keju mozzarella meleleh."
                     },
                     {
                         "id":  "20579865812",
                         "title":  "Kaki Ayam Kukus Dimsum / Chicken Feet",
                         "category":  "Dimsum Kukus",
                         "price":  59900,
                         "packSize":  "1 Pack",
                         "weightGram":  350,
                         "stock":  55,
                         "badge":  "",
                         "image":  "https://down-id.img.susercontent.com/file/id-11134207-8224v-mgc35emkijnz58",
                         "shopeeUrl":  "https://shopee.co.id/Kaki-Ayam-Kukus-Dimsum-Kaki-Ayam-Chicken-Feet-Ceker-Ayam-Dimsum-Chicken-Feet-Dimsum-Premium-by-Dimsum-Inc-i.1002650489.20579865812",
                         "description":  "Kaki ayam olahan resep khas oriental Dimsum Inc dengan bumbu rempah merah meresap empuk."
                     },
                     {
                         "id":  "21179869673",
                         "title":  "Dimsum Campur / Mix Dimsum (Siomay, Gyoza, Hakau) (12 Pcs)",
                         "category":  "Dimsum Kukus",
                         "price":  74900,
                         "packSize":  "1 Pack : 12 pcs (Kombinasi)",
                         "weightGram":  400,
                         "stock":  85,
                         "badge":  "Best Seller",
                         "image":  "https://down-id.img.susercontent.com/file/id-11134207-8224w-mgc2eahsu0wd48",
                         "shopeeUrl":  "https://shopee.co.id/Dimsum-Campur-Shiumay-Siomay-Somay-Gyoza-Pangsit-Kwotie-Kuotie-Kotie-Hargau-Hakau-Hakao-Hargao-Ayam-Udang-Ayam-Udang-Mix-Dimsum-Premium-by-Dimsum-Inc-i.1002650489.21179869673",
                         "description":  "Kombinasi varian dimsum kukus favorit Dimsum Inc dalam satu kemasan praktis."
                     },
                     {
                         "id":  "27609124295",
                         "title":  "Oyster Sauce Spring Roll / Lumpia Goreng Saus Tiram Premium",
                         "category":  "Dimsum Goreng",
                         "price":  79900,
                         "packSize":  "1 Pack : 10-12 pcs",
                         "weightGram":  380,
                         "stock":  60,
                         "badge":  "Crispy",
                         "image":  "https://down-id.img.susercontent.com/file/id-11134207-82251-mgd7m0bh9hxq90",
                         "shopeeUrl":  "https://shopee.co.id/DIMSUM-INC-Oyster-Sauce-Spring-Roll-Lumpia-Goreng-Lumpia-Goreng-Saus-Tiram-Lumpia-Saos-Tiram-Lumpia-Saus-Tiram-Lumpia-Kulit-Tahu-Saus-Tiram-Lumpia-Kulit-Tahu-Saos-Tiram-Premium-i.1002650489.27609124295",
                         "description":  "Lumpia goreng isi ayam udang berbalut kulit tahu dengan cita rasa bumbu saus tiram gurih renyah."
                     },
                     {
                         "id":  "23068157959",
                         "title":  "Pangsit Goreng Mayonaise / Mayo Prawn Dumpling Premium",
                         "category":  "Dimsum Goreng",
                         "price":  69900,
                         "packSize":  "1 Pack : 10-12 pcs",
                         "weightGram":  360,
                         "stock":  70,
                         "badge":  "Favorit",
                         "image":  "https://down-id.img.susercontent.com/file/id-11134207-8224t-mgbw68ljx5ahc7",
                         "shopeeUrl":  "https://shopee.co.id/Pangsit-Goreng-Mayonaise-Pangsit-Mayones-Pangsit-Udang-Mayonaise-Pangsit-Ayam-Pangsit-Udang-Pangsit-Ayam-Udang-Premium-by-Dimsum-Inc-i.1002650489.23068157959",
                         "description":  "Pangsit goreng isi olahan udang dan ayam renyah lengkap dengan cocolan saus mayones spesial."
                     },
                     {
                         "id":  "24035182168",
                         "title":  "Lumpia Kulit Tahu / Beancurd Spring Roll Premium",
                         "category":  "Dimsum Goreng",
                         "price":  74900,
                         "packSize":  "1 Pack",
                         "weightGram":  360,
                         "stock":  65,
                         "badge":  "",
                         "image":  "https://down-id.img.susercontent.com/file/id-11134207-8224v-mg4ub1860g7h9a",
                         "shopeeUrl":  "https://shopee.co.id/DIMSUM-INC-Lumpia-Kulit-Tahu-Lumpia-Goreng-Beancurd-Spring-Roll-Premium-i.1002650489.24035182168",
                         "description":  "Lumpia kulit kembang tahu dengan isian ayam dan udang cincang yang gurih dan bertekstur krispi saat digoreng."
                     },
                     {
                         "id":  "29759125918",
                         "title":  "Lumpia Goreng Ayam Udang / Spring Roll Premium",
                         "category":  "Dimsum Goreng",
                         "price":  69900,
                         "packSize":  "1 Pack",
                         "weightGram":  360,
                         "stock":  60,
                         "badge":  "",
                         "image":  "https://down-id.img.susercontent.com/file/id-11134207-8224z-mgddkqacra4t86",
                         "shopeeUrl":  "https://shopee.co.id/DIMSUM-INC-Lumpia-Goreng-Lumpia-Ayam-Udang-Lumpia-Ayam-Lumpia-Udang-Spring-Roll-Ayam-Spring-Roll-Udang-Spring-Roll-Ayam-Udang-Spring-Roll-Premium-i.1002650489.29759125918",
                         "description":  "Spring roll ayam dan udang berbalut kulit lumpia renyah."
                     },
                     {
                         "id":  "28708920048",
                         "title":  "Lumpia Goreng Mozzarella / Spring Roll Mozzarella Premium",
                         "category":  "Dimsum Goreng",
                         "price":  74900,
                         "packSize":  "1 Pack",
                         "weightGram":  380,
                         "stock":  55,
                         "badge":  "Keju Lumer",
                         "image":  "https://down-id.img.susercontent.com/file/id-11134207-8224r-mgd4bcxcqfbj36",
                         "shopeeUrl":  "https://shopee.co.id/DIMSUM-INC-Lumpia-Goreng-Mozzarella-Spring-Roll-Mozarella-Premium-i.1002650489.28708920048",
                         "description":  "Lumpia goreng isi keju mozzarella lembut yang lumer ketika digoreng hangat."
                     },
                     {
                         "id":  "23670119184",
                         "title":  "Mushroom \u0026 Mozzarella Spring Roll / Lumpia Jamur Keju",
                         "category":  "Dimsum Goreng",
                         "price":  74900,
                         "packSize":  "1 Pack",
                         "weightGram":  380,
                         "stock":  50,
                         "badge":  "",
                         "image":  "https://down-id.img.susercontent.com/file/id-11134207-82252-mgd6jcb36ex5dc",
                         "shopeeUrl":  "https://shopee.co.id/Mushroom-Mozzarella-Spring-Roll-Lumpia-Mozarella-Lumpia-Keju-Lumpia-Cheese-Spring-Roll-Keju-Spring-Roll-Cheese-Lumpia-Jamur-Keju-Spring-Roll-Jamur-Keju-Lumpia-Goreng-Jamur-Mozzarella-Premium-by-Dimsum-Inc-i.1002650489.23670119184",
                         "description":  "Paduan potongan jamur champignon gurih dengan keju mozzarella gurih meleleh dalam kulit lumpia krispi."
                     },
                     {
                         "id":  "18389168723",
                         "title":  "Vegetable Spring Roll / Lumpia Sayuran Goreng Premium",
                         "category":  "Dimsum Goreng",
                         "price":  64900,
                         "packSize":  "1 Pack",
                         "weightGram":  350,
                         "stock":  50,
                         "badge":  "Vegetarian",
                         "image":  "https://down-id.img.susercontent.com/file/id-11134207-82251-mgdf0ywi1ix71c",
                         "shopeeUrl":  "https://shopee.co.id/Vegetable-Spring-Roll-Lumpia-Sayuran-Lumpia-Goreng-Premium-by-Dimsum-Inc-i.1002650489.18389168723",
                         "description":  "Lumpia isi aneka sayuran segar berbumbu gurih untuk vegetarian \u0026 pecinta camilan renyah."
                     },
                     {
                         "id":  "26409126066",
                         "title":  "Lumpia Durian / Duren Spring Roll Premium",
                         "category":  "Dimsum Goreng",
                         "price":  79900,
                         "packSize":  "1 Pack",
                         "weightGram":  360,
                         "stock":  45,
                         "badge":  "Dessert",
                         "image":  "https://down-id.img.susercontent.com/file/id-11134207-8224v-mg6dw1011u6i85",
                         "shopeeUrl":  "https://shopee.co.id/DIMSUM-INC-Lumpia-Durian-Lumpia-Duren-Lumpia-Goreng-Lumpia-Fla-Duren-Lumpia-Fla-Durian-Duren-Spring-Roll-Durian-Spring-Roll-Premium-Montong-Monthong-Medan-Bawor-Petruk-Musang-King-i.1002650489.26409126066",
                         "description":  "Lumpia manis berisi vla durian legit premium yang meleleh saat digoreng keemasan."
                     },
                     {
                         "id":  "24876441840",
                         "title":  "Mix Fried Dimsum / Dimsum Campur Goreng Premium",
                         "category":  "Dimsum Goreng",
                         "price":  74900,
                         "packSize":  "1 Pack",
                         "weightGram":  380,
                         "stock":  70,
                         "badge":  "Best Seller",
                         "image":  "https://down-id.img.susercontent.com/file/id-11134207-82252-mgd0rcjy2qdq91",
                         "shopeeUrl":  "https://shopee.co.id/Mix-Fried-Dimsum-Dimsum-Campur-Goreng-Premium-by-Dimsum-Inc-i.1002650489.24876441840",
                         "description":  "Aneka dimsum goreng pilihan khas Dimsum Inc dalam satu kemasan hemat."
                     },
                     {
                         "id":  "17297568344",
                         "title":  "Bakpao Telur Asin / Salted Egg Pao Premium (6 Pcs)",
                         "category":  "Bakpao \u0026 Mantau",
                         "price":  59900,
                         "packSize":  "1 Pack : 6 pcs",
                         "weightGram":  360,
                         "stock":  75,
                         "badge":  "Lumer",
                         "image":  "https://down-id.img.susercontent.com/file/id-11134207-8224s-miv29tsysyknd2",
                         "shopeeUrl":  "https://shopee.co.id/Bakpao-Telur-Asin-Bakpau-Telur-Asin-Pao-Telur-Asin-Pau-Telur-Asin-Telor-Asin-Brebes-Telur-Asin-Brebes-Telur-Bebek-Telur-Ayam-Salted-Egg-Pao-Premium-by-Dimsum-Inc-i.1002650489.17297568344",
                         "description":  "Bakpao lembut dengan filling salted egg custard meleleh manis gurih yang terbuat dari kuning telur asin pilihan."
                     },
                     {
                         "id":  "21980151418",
                         "title":  "Bakpao Kacang Merah / Dao Sao Pao Premium (6 Pcs)",
                         "category":  "Bakpao \u0026 Mantau",
                         "price":  59900,
                         "packSize":  "1 Pack : 6 pcs",
                         "weightGram":  360,
                         "stock":  60,
                         "badge":  "",
                         "image":  "https://down-id.img.susercontent.com/file/id-11134207-82250-mg5xhv0jjimj07",
                         "shopeeUrl":  "https://shopee.co.id/Bakpao-Kacang-Merah-Bakpau-Kacang-Merah-Pao-Tausa-Dao-Sao-Pao-Premium-by-Dimsum-Inc-i.1002650489.21980151418",
                         "description":  "Bakpao kukus oriental lembut dengan pasta kacang merah halus manis alami."
                     },
                     {
                         "id":  "22543489999",
                         "title":  "Bakpao Ayam Kari / Chicken Curry Pao Premium (6 Pcs)",
                         "category":  "Bakpao \u0026 Mantau",
                         "price":  49900,
                         "packSize":  "1 Pack : 6 pcs",
                         "weightGram":  360,
                         "stock":  65,
                         "badge":  "Gurih",
                         "image":  "https://down-id.img.susercontent.com/file/id-11134207-8224z-miv29tsyud5361",
                         "shopeeUrl":  "https://shopee.co.id/Bakpao-Ayam-Kari-Bakpau-Ayam-Kari-Chicken-Curry-Pao-Premium-by-Dimsum-Inc-i.1002650489.22543489999",
                         "description":  "Bakpao gurih bertekstur empuk dengan isian daging ayam berbumbu rempah kari wangi gurih."
                     },
                     {
                         "id":  "23868980239",
                         "title":  "Bakpao Ayam Merah / Char Siu Pao Chicken Premium (6 Pcs)",
                         "category":  "Bakpao \u0026 Mantau",
                         "price":  49900,
                         "packSize":  "1 Pack : 6 pcs",
                         "weightGram":  360,
                         "stock":  70,
                         "badge":  "Halal",
                         "image":  "https://down-id.img.susercontent.com/file/id-11134207-8224v-miv29tsyx69z31",
                         "shopeeUrl":  "https://shopee.co.id/Bakpao-Ayam-Merah-Bakpau-Ayam-Merah-Chicken-Pao-Char-Siu-Pao-Premium-by-Dimsum-Inc-i.1002650489.23868980239",
                         "description":  "Bakpao kukus isi olahan daging ayam merah bumbu char siu oriental manis gurih (No pork, no lard halal)."
                     },
                     {
                         "id":  "26108869832",
                         "title":  "Bakpao Campur / Mix Pao Premium (8 Pcs)",
                         "category":  "Bakpao \u0026 Mantau",
                         "price":  79900,
                         "packSize":  "1 Pack : 8 pcs",
                         "weightGram":  480,
                         "stock":  55,
                         "badge":  "Mix 4 Rasa",
                         "image":  "https://down-id.img.susercontent.com/file/id-11134207-8224x-mgd0rcjyckcu02",
                         "shopeeUrl":  "https://shopee.co.id/DIMSUM-INC-Bakpao-Campur-Bakpau-Campur-Salted-Egg-Pao-Bakpao-Telur-Asin-Char-Siu-Pao-Bakpao-Ayam-Merah-Dao-Sao-Pao-Bakpao-Kacang-Merah-Chicken-Curry-Pao-Bakpao-Kari-Ayam-Mix-Pau-Mix-Pao-Premium-i.1002650489.26108869832",
                         "description":  "Paket kombinasi aneka rasa bakpao Dimsum Inc: Telur Asin, Char Siu Ayam, Kacang Merah, dan Kari Ayam."
                     },
                     {
                         "id":  "29058879735",
                         "title":  "Mantau Goreng Kukus / Mantao Bread Premium (6-8 Pcs)",
                         "category":  "Bakpao \u0026 Mantau",
                         "price":  44900,
                         "packSize":  "1 Pack : 6-8 pcs",
                         "weightGram":  350,
                         "stock":  65,
                         "badge":  "",
                         "image":  "https://down-id.img.susercontent.com/file/id-11134207-8224x-mgbsscvphslk9b",
                         "shopeeUrl":  "https://shopee.co.id/DIMSUM-INC-Mantau-Goreng-Kukus-Mantao-Goreng-Kukus-Roti-Roti-Goreng-Roti-Kukus-Bread-Mantou-Goreng-Kukus-Premium-by-Dimsum-Inc-i.1002650489.29058879735",
                         "description":  "Roti mantau tawar lembut dengan cita rasa gurih sedikit manis, cocok dikukus maupun digoreng krispi dengan cocolan kental manis."
                     },
                     {
                         "id":  "22568161069",
                         "title":  "Kulit Siomay Mentah Kuning Bulat 8 cm (1 Kg)",
                         "category":  "Bahan Baku \u0026 Mie",
                         "price":  19900,
                         "packSize":  "1 Pack : 1 Kg",
                         "weightGram":  1000,
                         "stock":  120,
                         "badge":  "Grosir",
                         "image":  "https://down-id.img.susercontent.com/file/id-11134207-8224q-mkx9a4i2hi4k97",
                         "shopeeUrl":  "https://shopee.co.id/Kulit-Siomay-Kulit-Somay-Kulit-Shiumay-Kulit-Siumay-Siomay-Ayam-Udang-Siomay-Ayam-Siomay-Udang-Kulit-Siomay-Mentah-Kulit-Shiomay-Mentah-Kulit-Dimsum-Premium-Kuning-Bulat-8-Cm-1-Kg-Dumpling-Wrap-by-Dimsum-Inc-i.1002650489.22568161069",
                         "description":  "Kulit dimsum siomay kuning bulat diameter 8 cm kualitas premium standar resto, lentur dan tidak mudah sobek."
                     },
                     {
                         "id":  "26958871546",
                         "title":  "Kulit Pangsit Kotak 10 x 10 cm (1 Kg)",
                         "category":  "Bahan Baku \u0026 Mie",
                         "price":  19900,
                         "packSize":  "1 Pack : 1 Kg",
                         "weightGram":  1000,
                         "stock":  110,
                         "badge":  "",
                         "image":  "https://down-id.img.susercontent.com/file/id-11134207-8224t-mgbpvrm6kop8e3",
                         "shopeeUrl":  "https://shopee.co.id/DIMSUM-INC-Kulit-Pangsit-Pangsit-Ayam-Pangsit-Udang-Pangsit-Ayam-Udang-Kulit-Pangsit-Ayam-Kulit-Pangsit-Udang-Kulit-Pangsit-Ayam-Udang-Kulit-Pangsit-Premium-Dumpling-Wrap-10-X-10-Cm-i.1002650489.26958871546",
                         "description":  "Kulit pangsit kotak ukuran 10x10 cm serbaguna untuk pangsit rebus maupun pangsit goreng super krispi."
                     },
                     {
                         "id":  "27558872012",
                         "title":  "Kulit Gyoza / Kuotie Bulat 10 cm (1 Kg)",
                         "category":  "Bahan Baku \u0026 Mie",
                         "price":  19900,
                         "packSize":  "1 Pack : 1 Kg",
                         "weightGram":  1000,
                         "stock":  100,
                         "badge":  "",
                         "image":  "https://down-id.img.susercontent.com/file/id-11134207-82252-mgbp2ns1hjwo36",
                         "shopeeUrl":  "https://shopee.co.id/DIMSUM-INC-Kulit-Gyoza-Kulit-Pangsit-Kulit-Kwotie-Kulit-Kotie-Kulit-Kuotie-Pangsit-Ayam-Pangsit-Udang-Pangsit-Ayam-Udang-Gyoza-Ayam-Gyoza-Udang-Gyoza-Ayam-Udang-Kulit-Dimsum-Premium-Bulat-10-cm-1-Kg-Dumpling-Wrap-i.1002650489.27558872012",
                         "description":  "Kulit gyoza bulat diameter 10 cm elastis dan lentur cocok untuk gyoza, mandu, dan kwotie."
                     },
                     {
                         "id":  "16997482581",
                         "title":  "Bakmie Ayam Mentah Basah Cap Mercusuar 1 Kg (10 Porsi)",
                         "category":  "Bahan Baku \u0026 Mie",
                         "price":  19900,
                         "packSize":  "1 Pack : 1 Kg (10 gulung)",
                         "weightGram":  1000,
                         "stock":  95,
                         "badge":  "Best Seller",
                         "image":  "https://down-id.img.susercontent.com/file/id-11134207-82250-mg4rbhdwrriic7",
                         "shopeeUrl":  "https://shopee.co.id/Bakmie-Ayam-Bakmi-Ayam-Mi-Ayam-Mie-Ayam-Bakmie-Bakmi-Mie-Mentah-Basah-Premium-Cap-Mercusuar-1-Kg-isi-10-Pcs-by-Dimsum-Inc-i.1002650489.16997482581",
                         "description":  "Mie telur basah mentah premium kenyal gurih cap Mercusuar isi 10 porsi per kilogram, tanpa pengawet berbahaya."
                     },
                     {
                         "id":  "18989117845",
                         "title":  "Sambal Minyak Cabai / Chili Oil Botol Premium",
                         "category":  "Saus \u0026 Pelengkap",
                         "price":  19900,
                         "packSize":  "1 Botol (100 - 150 Gram)",
                         "weightGram":  200,
                         "stock":  120,
                         "badge":  "Botol",
                         "image":  "https://down-id.img.susercontent.com/file/id-11134207-8224t-mgc2n6itfllbc3",
                         "shopeeUrl":  "https://shopee.co.id/Sambal-Minyak-Cabai-Minyak-Cabe-Cili-Oil-Chili-Oil-Sauce-Chili-Oil-Sambal-Sambal-Dimsum-Sambel-Dimsum-Saos-Dimsum-Saus-Dimsum-Dimsum-Sauce-Saus-Cabe-Saos-Cabe-Sambal-Cabe-Sambel-Cabe-Chilli-Oil-Botol-Premium-by-Dimsum-Inc-i.1002650489.18989117845",
                         "description":  "Chili oil aromatik khas Dimsum Inc terbuat dari cabai kering sangrai, bawang, dan rempah pilihan dalam kemasan botol."
                     },
                     {
                         "id":  "18588832408",
                         "title":  "Sambal Minyak Cabai / Chili Oil Sachet Premium",
                         "category":  "Saus \u0026 Pelengkap",
                         "price":  19900,
                         "packSize":  "Multipack Sachet",
                         "weightGram":  150,
                         "stock":  120,
                         "badge":  "Praktis",
                         "image":  "https://down-id.img.susercontent.com/file/id-11134207-8224s-mgc2n6itieq7a7",
                         "shopeeUrl":  "https://shopee.co.id/Sambal-Minyak-Cabai-Minyak-Cabe-Cili-Oil-Chili-Oil-Sauce-Chili-Oil-Sambal-Sambal-Dimsum-Sambel-Dimsum-Saos-Dimsum-Saus-Dimsum-Dimsum-Sauce-Saus-Cabe-Saos-Cabe-Sambal-Cabe-Sambel-Cabe-Chilli-Oil-Sachet-Premium-by-Dimsum-Inc-i.1002650489.18588832408",
                         "description":  "Chili oil sachet praktis siap bawa untuk pelengkap makan dimsum di mana saja."
                     },
                     {
                         "id":  "21180558977",
                         "title":  "BELI 3 LEBIH HEMAT - Kulit Siomay 1 Kg (Isi 3 Pack)",
                         "category":  "Paket Hemat",
                         "price":  49900,
                         "packSize":  "3 Pack (3 Kg)",
                         "weightGram":  3000,
                         "stock":  60,
                         "badge":  "Hemat 38%",
                         "image":  "https://down-id.img.susercontent.com/file/id-11134207-8224p-mkx9a4i27o5g3e",
                         "shopeeUrl":  "https://shopee.co.id/BELI-3-LEBIH-HEMAT-Kulit-Siomay-Kulit-Somay-Kulit-Shiumay-Kulit-Siumay-Siomay-Ayam-Udang-Siomay-Ayam-Siomay-Udang-Kulit-Siomay-Mentah-Kulit-Shiomay-Mentah-Kulit-Dimsum-Premium-Kuning-Bulat-8-Cm-1-Kg-Dumpling-Wrap-Isi-3-Pack-i.1002650489.21180558977",
                         "description":  "Paket grosir bundling 3 pack kulit siomay kuning 8 cm hemat 38%."
                     },
                     {
                         "id":  "22971470612",
                         "title":  "BELI 3 LEBIH HEMAT - Kulit Pangsit Kotak 10x10 cm (3 Pack)",
                         "category":  "Paket Hemat",
                         "price":  44900,
                         "packSize":  "3 Pack (3 Kg)",
                         "weightGram":  3000,
                         "stock":  60,
                         "badge":  "Hemat 44%",
                         "image":  "https://down-id.img.susercontent.com/file/id-11134207-8224s-mgbpuhiu8iyzee",
                         "shopeeUrl":  "https://shopee.co.id/BELI-3-LEBIH-HEMAT-Kulit-Pangsit-Pangsit-Ayam-Pangsit-Udang-Pangsit-Ayam-Udang-Kulit-Pangsit-Ayam-Kulit-Pangsit-Udang-Kulit-Pangsit-Ayam-Udang-Kulit-Pangsit-Premium-Dumpling-Wrap-10-X-10-Cm-Isi-3-Pack-by-Dimsum-Inc-i.1002650489.22971470612",
                         "description":  "Paket grosir bundling 3 pack kulit pangsit kotak hemat 44%."
                     },
                     {
                         "id":  "29326132270",
                         "title":  "BELI 3 LEBIH HEMAT - Kulit Gyoza 10 cm (Isi 3 Pack)",
                         "category":  "Paket Hemat",
                         "price":  54900,
                         "packSize":  "3 Pack (3 Kg)",
                         "weightGram":  3000,
                         "stock":  55,
                         "badge":  "Hemat 39%",
                         "image":  "https://down-id.img.susercontent.com/file/id-11134207-8224x-mgbpnusvp79le4",
                         "shopeeUrl":  "https://shopee.co.id/BELI-3-LEBIH-HEMAT-Kulit-Gyoza-Kulit-Pangsit-Kulit-Kwotie-Kulit-Kotie-Kulit-Kuotie-Pangsit-Ayam-Pangsit-Udang-Pangsit-Ayam-Udang-Gyoza-Ayam-Gyoza-Udang-Kulit-Dimsum-Premium-Bulat-10-cm-1-Kg-Dumpling-Wrap-by-Dimsum-Inc-i.1002650489.29326132270",
                         "description":  "Paket bundling 3 pack kulit gyoza bulat hemat 39%."
                     },
                     {
                         "id":  "27741257973",
                         "title":  "BELI 3 LEBIH HEMAT - Bakmie Ayam Basah 1 Kg (Isi 3 Pack)",
                         "category":  "Paket Hemat",
                         "price":  49900,
                         "packSize":  "3 Pack (3 Kg - 30 porsi)",
                         "weightGram":  3000,
                         "stock":  65,
                         "badge":  "Hemat 57%",
                         "image":  "https://down-id.img.susercontent.com/file/id-11134207-82251-mg4ru1hwiuq136",
                         "shopeeUrl":  "https://shopee.co.id/BELI-3-LEBIH-HEMAT-Bakmie-Ayam-Bakmi-Ayam-Mi-Ayam-Mie-Ayam-Bakmie-Bakmi-Mie-Mentah-Basah-Premium-Cap-Mercusuar-1-Kg-isi-10-Pcs-by-Dimsum-Inc-i.1002650489.27741257973",
                         "description":  "Paket grosir 3 kg mie basah cap Mercusuar diskon hingga 57%."
                     },
                     {
                         "id":  "29578853579",
                         "title":  "PAKET KOMBO PAO - Kacang Merah + Char Siu Ayam",
                         "category":  "Paket Hemat",
                         "price":  119900,
                         "packSize":  "2 Pack",
                         "weightGram":  720,
                         "stock":  40,
                         "badge":  "Kombo 2in1",
                         "image":  "https://down-id.img.susercontent.com/file/id-11134207-8224y-mglvrb47ao7i2a",
                         "shopeeUrl":  "https://shopee.co.id/PAKET-KOMBO-PAO-DIMSUM-INC-Dao-Sao-Pao-Char-Siu-Pao-(-Bakpao-Kacang-Merah-Bakpau-Kacang-Merah-Pao-Kacang-Mer-Bakpao-Ayam-Merah-Bakpau-Ayam-Merah-Pao-Ayam-Merah-)-i.1002650489.29578853579",
                         "description":  "Kombo hemat 2 pak bakpao premium: 1 pack bakpao kacang merah + 1 pack bakpao char siu ayam merah."
                     },
                     {
                         "id":  "24642389422",
                         "title":  "PAKET KOMBO PAO - Telur Asin + Char Siu Ayam",
                         "category":  "Paket Hemat",
                         "price":  119900,
                         "packSize":  "2 Pack",
                         "weightGram":  720,
                         "stock":  40,
                         "badge":  "Kombo 2in1",
                         "image":  "https://down-id.img.susercontent.com/file/id-11134207-8224r-mglwcdqdu1hpe7",
                         "shopeeUrl":  "https://shopee.co.id/PAKET-KOMBO-PAO-DIMSUM-INC-Salted-Egg-Pao-Char-Siu-Pao-(-Bakpao-Telur-Asin-Bakpau-Telur-Asin-Pao-Telur-Asin-Bakpao-Ayam-Merah-Bakpau-Ayam-Merah-Pao-Ayam-Merah-)-i.1002650489.24642389422",
                         "description":  "Kombo 1 pack bakpao telur asin lumer + 1 pack bakpao ayam merah char siu."
                     },
                     {
                         "id":  "25042394444",
                         "title":  "PAKET KOMBO PAO - Telur Asin + Kacang Merah",
                         "category":  "Paket Hemat",
                         "price":  119900,
                         "packSize":  "2 Pack",
                         "weightGram":  720,
                         "stock":  40,
                         "badge":  "Kombo 2in1",
                         "image":  "https://down-id.img.susercontent.com/file/id-11134207-8224x-mgm2gtdgxfd4ec",
                         "shopeeUrl":  "https://shopee.co.id/PAKET-KOMBO-PAO-DIMSUM-INC-Salted-Egg-Pao-Dao-Sao-Pao-(-Bakpao-Telur-Asin-Bakpau-Telur-Asin-Pao-Telur-Asin-Bakpao-Kacang-Merah-Bakpau-Kacang-Merah-Pao-Kacang-Merah-)-i.1002650489.25042394444",
                         "description":  "Kombo manis: 1 pack bakpao telur asin + 1 pack bakpao tausa kacang merah."
                     },
                     {
                         "id":  "26378875722",
                         "title":  "PAKET KOMBO PAO - Kari Ayam + Kacang Merah",
                         "category":  "Paket Hemat",
                         "price":  119900,
                         "packSize":  "2 Pack",
                         "weightGram":  720,
                         "stock":  40,
                         "badge":  "Kombo 2in1",
                         "image":  "https://down-id.img.susercontent.com/file/id-11134207-8224x-mgm31eo4mhvwbd",
                         "shopeeUrl":  "https://shopee.co.id/PAKET-KOMBO-PAO-DIMSUM-INC-Chicken-Curry-Pao-Dao-Sao-Pao-(-Bakpao-Kari-Ayam-Bakpau-Kari-Ayam-Pao-Kari-Ayam-Bakpao-Kacang-Merah-Bakpau-Kacang-Merah-Pao-Kacang-Merah-)-i.1002650489.26378875722",
                         "description":  "Kombo gurih \u0026 manis: 1 pack bakpao kari ayam + 1 pack bakpao kacang merah."
                     },
                     {
                         "id":  "29428864783",
                         "title":  "PAKET KOMBO PAO - Kari Ayam + Char Siu Ayam",
                         "category":  "Paket Hemat",
                         "price":  119900,
                         "packSize":  "2 Pack",
                         "weightGram":  720,
                         "stock":  40,
                         "badge":  "Kombo 2in1",
                         "image":  "https://down-id.img.susercontent.com/file/id-11134207-82250-mgq0d6pdpl3e34",
                         "shopeeUrl":  "https://shopee.co.id/PAKET-KOMBO-PAO-DIMSUM-INC-Chicken-Curry-Pao-Char-Siu-Pao-(-Bakpao-Kari-Ayam-Bakpau-Kari-Ayam-Pao-Kari-Ayam-Bakpao-Ayam-Merah-Bakpau-Ayam-Merah-Pao-Ayam-Merah-)-i.1002650489.29428864783",
                         "description":  "Kombo daging ayam mantap: 1 pack bakpao ayam kari + 1 pack bakpao ayam char siu merah."
                     },
                     {
                         "id":  "28078866419",
                         "title":  "PAKET KOMBO PAO - Kari Ayam + Mantau",
                         "category":  "Paket Hemat",
                         "price":  119900,
                         "packSize":  "2 Pack",
                         "weightGram":  720,
                         "stock":  40,
                         "badge":  "Kombo 2in1",
                         "image":  "https://down-id.img.susercontent.com/file/id-11134207-8224p-mgn1tk0775sce7",
                         "shopeeUrl":  "https://shopee.co.id/PAKET-KOMBO-PAO-DIMSUM-INC-Chicken-Curry-Pao-Mantao-(-Bakpao-Kari-Ayam-Bakpau-Kari-Ayam-Pao-Kari-Ayam-Mantao-Goreng-Kukus-Mantau-Goreng-Kukus-Mantou-Goreng-Kukus-)-i.1002650489.28078866419",
                         "description":  "Kombo 1 pack bakpao ayam kari + 1 pack roti mantau goreng/kukus."
                     },
                     {
                         "id":  "22243498544",
                         "title":  "PAKET 3 IN 1 SPECIAL - Shiumay + Hakau + Chili Oil + Free Bag",
                         "category":  "Hampers \u0026 Bundling",
                         "price":  74900,
                         "packSize":  "Shiumay (12) + Hakau (12) + Chili Oil",
                         "weightGram":  850,
                         "stock":  50,
                         "badge":  "Promo 3in1",
                         "image":  "https://down-id.img.susercontent.com/file/id-11134207-8224s-mghgyyid572id0",
                         "shopeeUrl":  "https://shopee.co.id/PAKET-3-IN-1-SPECIAL-DIMSUM-INC-Shiumay-Siomay-Somay-Hakau-Har-Gau-Chili-Oil-Sachet-Minyak-Cabai-Free-Shopping-Bag-i.1002650489.22243498544",
                         "description":  "Paket best-seller 3-in-1 lengkap: 1 pack siomay ayam udang, 1 pack hakau udang, chili oil sachet, bonus shopping bag spunbond Dimsum Inc."
                     },
                     {
                         "id":  "29206738971",
                         "title":  "PAKET 3 IN 1 SPECIAL - Chicken Feet + Shiumay + Chili Oil",
                         "category":  "Hampers \u0026 Bundling",
                         "price":  169900,
                         "packSize":  "Chicken Feet + Shiumay (12) + Chili Oil",
                         "weightGram":  800,
                         "stock":  35,
                         "badge":  "Free Bag",
                         "image":  "https://down-id.img.susercontent.com/file/id-11134207-8224x-mgfzrh84aln3b9",
                         "shopeeUrl":  "https://shopee.co.id/PAKET-3-IN-1-SPECIAL-DIMSUM-INC-Chicken-Feet-Ceker-Ayam-Dimsum-Shiumay-Siomay-Siumay-Somay-Dimsum-Premium-Chili-Oil-Sachet-Minyak-Cabai-Free-Shopping-Bag-i.1002650489.29206738971",
                         "description":  "Paket komplit: Kaki ayam empuk, siomay ayam udang lezat, chili oil, dan gratis tas belanja."
                     },
                     {
                         "id":  "29256738139",
                         "title":  "PAKET 3 IN 1 SPECIAL - Mix Dimsum + Mix PKG + Chili Oil",
                         "category":  "Hampers \u0026 Bundling",
                         "price":  159900,
                         "packSize":  "Mix Dimsum + Mix PKG + Chili Oil",
                         "weightGram":  850,
                         "stock":  40,
                         "badge":  "Free Bag",
                         "image":  "https://down-id.img.susercontent.com/file/id-11134207-8224s-mgpzugs380lrb7",
                         "shopeeUrl":  "https://shopee.co.id/PAKET-3-IN-1-SPECIAL-DIMSUM-INC-Mix-Dimsum-(-Shiumay-Siomay-Har-Gau-Hakau-Gyoza-Pangsit-)-Mix-PKG-(-Gyoza-Pangsit-Spring-Roll-Lumpia-Ayam-Udang-)-Chili-Oil-Minyak-Cabai-Sachet-Free-Shopping-Bag-i.1002650489.29256738139",
                         "description":  "Paket komplit kukus dan goreng: Mix Dimsum (Siomay/Hakau/Gyoza) + Mix PKG (Gyoza/Spring Roll) + Chili Oil Sachet + Free Tas Spunbond."
                     },
                     {
                         "id":  "29569191459",
                         "title":  "DIMSUM INC Hampers Parcel (Mix Dimsum + Salted Egg Pao)",
                         "category":  "Hampers \u0026 Bundling",
                         "price":  159900,
                         "packSize":  "Hampers Parcel Box",
                         "weightGram":  900,
                         "stock":  30,
                         "badge":  "Hampers",
                         "image":  "https://down-id.img.susercontent.com/file/id-11134207-8224x-mgq0d6paxurt24",
                         "shopeeUrl":  "https://shopee.co.id/DIMSUM-INC-Hampers-Parcel-Mix-Dimsum-(-Siomay-Shiu-May-Bean-Curd-Spring-Roll-Lumpia-Kulit-Tahu-)-Salted-Egg-Pao-Bakpao-Telur-Asin-Chili-Oil-Sachet-Minyak-Cabai-Saset-Hampers-Kado-Parcel-Buah-Tangan-i.1002650489.29569191459",
                         "description":  "Parcel kado/buah tangan elegan: Mix Dimsum (Siomay \u0026 Lumpia Kulit Tahu) + Bakpao Telur Asin + Chili Oil Sachet."
                     },
                     {
                         "id":  "26391025122",
                         "title":  "Paket Special Bakmie x Mix Dimsum x Chili Oil",
                         "category":  "Hampers \u0026 Bundling",
                         "price":  139900,
                         "packSize":  "Bakmie 1 Kg + Mix Dimsum + Chili Oil",
                         "weightGram":  1450,
                         "stock":  40,
                         "badge":  "Bundling Mie",
                         "image":  "https://down-id.img.susercontent.com/file/id-11134207-8224w-mgem5cvatc0ace",
                         "shopeeUrl":  "https://shopee.co.id/Bakmie-Mie-x-Mix-Dimsum-(-Shiumay-Hakau-Gyoza-)-x-Chili-Oil-Sachet-Minyak-Cabai-I-Paket-Special-Bakmie-by-Dimsum-Inc-i.1002650489.26391025122",
                         "description":  "Paket spesial makan bakmie komplit: Bakmie mentah 1 kg + Mix Dimsum kukus (Shiumay, Hakau, Gyoza) + Chili Oil."
                     },
                     {
                         "id":  "42165457481",
                         "title":  "Paket Special Bakmie x Siomay Mozzarella x Chili Oil",
                         "category":  "Hampers \u0026 Bundling",
                         "price":  129900,
                         "packSize":  "Bakmie 1 Kg + Siomay Mozzarella + Chili Oil",
                         "weightGram":  1450,
                         "stock":  40,
                         "badge":  "Bundling Mie",
                         "image":  "https://down-id.img.susercontent.com/file/id-11134207-8224q-mghfuiemj3t81a",
                         "shopeeUrl":  "https://shopee.co.id/Bakmie-Mie-x-Shiumay-Siomay-Mozzarella-x-Chili-Oil-Sachet-Minyak-Cabai-I-Paket-Special-Bakmie-by-Dimsum-Inc-i.1002650489.42165457481",
                         "description":  "Paket bakmie 1 kg dipadu dengan kelezatan siomay topping mozzarella meleleh dan chili oil."
                     },
                     {
                         "id":  "41265621667",
                         "title":  "Paket Special Bakmie x Spring Roll Ayam Udang x Chili Oil",
                         "category":  "Hampers \u0026 Bundling",
                         "price":  129900,
                         "packSize":  "Bakmie 1 Kg + Spring Roll + Chili Oil",
                         "weightGram":  1400,
                         "stock":  40,
                         "badge":  "Bundling Mie",
                         "image":  "https://down-id.img.susercontent.com/file/id-11134207-8224w-mgfylkyhiary7b",
                         "shopeeUrl":  "https://shopee.co.id/Bakmie-Mie-x-Spring-Roll-Lumpia-Ayam-Udang-x-Chili-Oil-Sachet-Minyak-Cabai-I-Paket-Special-Bakmie-by-Dimsum-Inc-i.1002650489.41265621667",
                         "description":  "Paket bakmie ayam basah lengkap dengan pendamping lumpia ayam udang renyah dan chili oil."
                     },
                     {
                         "id":  "42915461067",
                         "title":  "Paket Special Bakmie x Gyoza Ayam Udang x Chili Oil",
                         "category":  "Hampers \u0026 Bundling",
                         "price":  129900,
                         "packSize":  "Bakmie 1 Kg + Gyoza + Chili Oil",
                         "weightGram":  1400,
                         "stock":  40,
                         "badge":  "Bundling Mie",
                         "image":  "https://down-id.img.susercontent.com/file/id-11134207-8224q-mhk5oisd3vno44",
                         "shopeeUrl":  "https://shopee.co.id/Bakmie-Mie-x-Gyoza-Pangsit-Ayam-Udang-x-Chili-Oil-Sachet-Minyak-Cabai-I-Paket-Special-Bakmie-by-Dimsum-Inc-i.1002650489.42915461067",
                         "description":  "Paket bakmie nikmat dengan topping gyoza pangsit ayam udang dan chili oil pedas gurih."
                     },
                     {
                         "id":  "44365453614",
                         "title":  "Paket Special Bakmie x Chicken Feet (Ceker Ayam)",
                         "category":  "Hampers \u0026 Bundling",
                         "price":  139900,
                         "packSize":  "Bakmie 1 Kg + Chicken Feet + Chili Oil",
                         "weightGram":  1400,
                         "stock":  35,
                         "badge":  "Bundling Mie",
                         "image":  "https://down-id.img.susercontent.com/file/id-11134207-82251-mghc26w1l3wve6",
                         "shopeeUrl":  "https://shopee.co.id/Bakmie-Mie-x-Chicken-Feet-Ceker-Ayam-Kukus-DImsum-x-Chili-Oil-Sachet-Minyak-Cabai-I-Paket-Special-Bakmie-by-Dimsum-Inc-i.1002650489.44365453614",
                         "description":  "Menu bakmie ceker ala Dimsum Inc: Bakmie kenyal dan kaki ayam empuk berbumbu rempah merah."
                     },
                     {
                         "id":  "29240557934",
                         "title":  "Paket Special Bakmie x Mayo Prawn Dumpling",
                         "category":  "Hampers \u0026 Bundling",
                         "price":  129900,
                         "packSize":  "Bakmie 1 Kg + Pangsit Udang Mayones + Chili Oil",
                         "weightGram":  1400,
                         "stock":  40,
                         "badge":  "Bundling Mie",
                         "image":  "https://down-id.img.susercontent.com/file/id-11134207-8224w-mgfylkytg4js70",
                         "shopeeUrl":  "https://shopee.co.id/Bakmie-Mie-x-Mayo-Prawn-Dumpling-Pangsit-Goreng-Mayonaise-x-Chili-Oil-Sachet-Minyak-Cabai-I-Paket-Special-Bakmie-by-Dimsum-Inc-i.1002650489.29240557934",
                         "description":  "Bakmie 1 kg lezat berpadu kriuk pangsit goreng udang mayones."
                     },
                     {
                         "id":  "29376445813",
                         "title":  "Styrofoam Box Kotak Penyimpanan Makanan Frozen",
                         "category":  "Saus \u0026 Pelengkap",
                         "price":  20000,
                         "packSize":  "1 Box",
                         "weightGram":  300,
                         "stock":  100,
                         "badge":  "Pelengkap",
                         "image":  "https://down-id.img.susercontent.com/file/id-11134207-8224p-mglxxnjarvv23e",
                         "shopeeUrl":  "https://shopee.co.id/Styrofoam-Box-Sterofoam-Kotak-Penyimpanan-Makanan-Frozen-Dimsum-Inc-i.1002650489.29376445813",
                         "description":  "Kotak sterofoam khusus menjaga suhu dingin makanan beku agar tetap beku dan higienis selama pengiriman sameday/nextday."
                     },
                     {
                         "id":  "25477289377",
                         "title":  "Shopping Bag Bahan Spunbond Hitam (35 x 25 cm)",
                         "category":  "Saus \u0026 Pelengkap",
                         "price":  4000,
                         "packSize":  "1 Pcs",
                         "weightGram":  50,
                         "stock":  200,
                         "badge":  "Pelengkap",
                         "image":  "https://down-id.img.susercontent.com/file/id-11134207-8224z-mgdfd7o3bcp424",
                         "shopeeUrl":  "https://shopee.co.id/Shopping-Bag-Bahan-Spound-Hitam-Size-35x25-Cm-By-Dimsum-Inc-i.1002650489.25477289377",
                         "description":  "Tas belanja ramah lingkungan bahan spunbond warna hitam elegan berlogo Dimsum Inc ukuran 35 x 25 cm."
                     }
                 ]
};

const state = {
  isLiveBackend: false,
  currentUser: null,
  googleClientId: "",
  store: FALLBACK_CATALOG.store,
  products: FALLBACK_CATALOG.products,
  flashSale: null,
  activeCategory: "Semua",
  searchQuery: "",
  sortBy: "featured",
  bannerIndex: 0,
  cart: JSON.parse(localStorage.getItem("dimsum_cart") || "[]"),
  selectedLocation: null,
  shippingRates: [],
  selectedCourier: null,
  activeOrderId: null,
  pollTimer: null,
  countdownTimer: null,
  flashTimerInterval: null
};

const rp = (num) => "Rp " + Number(num || 0).toLocaleString("id-ID");

function escapeHtml(str) {
  return String(str || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function showToast(msg) {
  const el = document.getElementById("toast");
  el.textContent = msg;
  el.classList.remove("hidden");
  clearTimeout(el._t);
  el._t = setTimeout(() => el.classList.add("hidden"), 2800);
}

async function apiFetch(url, options = {}) {
  const res = await fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      "X-Requested-With": "XMLHttpRequest",
      ...(options.headers || {})
    }
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Permintaan gagal");
  return data;
}

function computeLocalFlashSale(products) {
  const FIVE_HOURS_MS = 5 * 60 * 60 * 1000;
  const SINGLE_CATS = new Set(["Dimsum Kukus", "Dimsum Goreng", "Bakpao & Mantau"]);
  const singles = products.filter((p) => SINGLE_CATS.has(p.category));
  const pool = singles.length >= 5 ? singles : products;
  const now = Date.now();
  const slot = Math.floor(now / FIVE_HOURS_MS);
  const nextRotationAt = (slot + 1) * FIVE_HOURS_MS;
  const items = [];
  if (pool.length > 0) {
    const startIdx = (slot * 5) % pool.length;
    for (let i = 0; i < Math.min(5, pool.length); i++) {
      const p = pool[(startIdx + i) % pool.length];
      items.push({ id: p.id, originalPrice: p.price, flashPrice: Math.round(p.price * 0.95), limitQty: 10 });
    }
  }
  return { slot, nextRotationAt, limitQty: 10, items };
}

function getFlashMap() {
  const fs = state.flashSale || computeLocalFlashSale(state.products);
  return new Map((fs.items || []).map((f) => [f.id, f]));
}

// ---------- Init & Catalog ----------
async function init() {
  try {
    const data = await apiFetch("/api/catalog", { method: "GET" });
    state.store = data.store;
    state.products = data.products;
    state.flashSale = data.flashSale || computeLocalFlashSale(state.products);
    state.isLiveBackend = true;
  } catch {
    state.isLiveBackend = false;
    state.flashSale = computeLocalFlashSale(state.products);
  }

  renderBrandAvatar();
  renderTopMedia();
  renderCategoryGrid();
  renderFlashSale();
  startFlashTimer();
  renderProducts();
  renderCart();
  await initAuth();
  bindEvents();
}

function renderBrandAvatar() {
  const logoEl = document.querySelector(".brand-logo");
  if (logoEl) {
    const src = state.store.avatarUrl || "/assets/logo.png";
    logoEl.innerHTML = `<img src="${escapeHtml(src)}" alt="${escapeHtml(state.store.name)}" style="width:100%;height:100%;object-fit:cover;border-radius:50%;" />`;
  }
}

function renderTopMedia() {
  const tableSec = document.getElementById("tableSpreadSection");
  const tableImg = state.store.tableSpreadImage;
  if (tableSec && tableImg) {
    tableSec.innerHTML = `<img src="${escapeHtml(tableImg)}" alt="Produk Dimsum Inc Frozen Official" loading="eager" />`;
  } else if (tableSec) {
    tableSec.classList.add("hidden");
  }
}

const CATEGORY_ICONS = {
  Semua: "🍱",
  "Dimsum Kukus": "🥟",
  "Dimsum Goreng": "🍤",
  "Bakpao & Mantau": "🥯",
  "Bahan Baku & Mie": "🍜",
  "Saus & Pelengkap": "🌶️",
  "Paket Hemat": "🏷️",
  "Hampers & Bundling": "🎁"
};

function renderCategoryGrid() {
  const cats = ["Semua", ...new Set(state.products.map((p) => p.category))];
  const grid = document.getElementById("categoryGrid");
  if (!grid) return;
  grid.innerHTML = cats
    .map(
      (c) => `
    <button class="cat-tile ${c === state.activeCategory ? "active" : ""}" data-cat="${escapeHtml(c)}" type="button">
      <span class="cat-icon">${CATEGORY_ICONS[c] || "🥟"}</span>
      <span class="cat-label">${escapeHtml(c)}</span>
    </button>
  `
    )
    .join("");

  grid.querySelectorAll(".cat-tile").forEach((btn) => {
    btn.addEventListener("click", () => {
      state.activeCategory = btn.dataset.cat;
      renderCategoryGrid();
      renderProducts();
      document.getElementById("katalog").scrollIntoView({ behavior: "smooth" });
    });
  });
}

function renderFlashSale() {
  const strip = document.getElementById("flashSaleRow");
  if (!strip) return;
  const flashMap = getFlashMap();
  const flashProducts = state.products.filter((p) => flashMap.has(p.id));
  strip.innerHTML = flashProducts.map((p) => productCardHtml(p, true)).join("");
  bindCardEvents(strip);
}

function startFlashTimer() {
  clearInterval(state.flashTimerInterval);
  const timerEl = document.getElementById("flashTimer");
  if (!timerEl) return;

  const update = () => {
    const target = state.flashSale?.nextRotationAt || Date.now() + 5 * 3600 * 1000;
    const diffSec = Math.max(0, Math.floor((target - Date.now()) / 1000));
    if (diffSec === 0) {
      state.flashSale = computeLocalFlashSale(state.products);
      renderFlashSale();
      renderProducts();
    }
    const h = String(Math.floor(diffSec / 3600)).padStart(2, "0");
    const m = String(Math.floor((diffSec % 3600) / 60)).padStart(2, "0");
    const s = String(diffSec % 60).padStart(2, "0");
    timerEl.textContent = `${h} : ${m} : ${s}`;
  };

  update();
  state.flashTimerInterval = setInterval(update, 1000);
}

function productCardHtml(p, isFlashRow = false) {
  const flashItem = getFlashMap().get(p.id);
  const effectivePrice = flashItem ? flashItem.flashPrice : p.price;

  return `
    <article class="product-card">
      <div class="product-thumb" data-detail="${escapeHtml(p.id)}">
        <img src="${escapeHtml(p.image)}" alt="${escapeHtml(p.title)}" loading="lazy" />
      </div>
      <div class="product-body">
        <span class="product-cat">${escapeHtml(p.category)}</span>
        <h3 class="product-title" data-detail="${escapeHtml(p.id)}">${escapeHtml(p.title)}</h3>
        <span class="product-pack">${escapeHtml(p.packSize || `${p.weightGram}g`)}</span>
        ${isFlashRow && flashItem ? `<div class="flash-limit">Maks. ${flashItem.limitQty} pcs / order</div>` : ""}
        <div class="product-footer">
          <div>
            ${flashItem ? `<span class="price-old">${rp(p.price)}</span>` : ""}
            <span class="price-now">${rp(effectivePrice)}</span>
          </div>
          <button class="add-circle-btn add-cart-btn" data-id="${escapeHtml(p.id)}" type="button" aria-label="Tambah ${escapeHtml(p.title)}">+</button>
        </div>
      </div>
    </article>
  `;
}

function bindCardEvents(container) {
  container.querySelectorAll(".add-cart-btn").forEach((btn) => {
    btn.addEventListener("click", () => addToCart(btn.dataset.id));
  });
  container.querySelectorAll("[data-detail]").forEach((el) => {
    el.addEventListener("click", () => openProductDetail(el.dataset.detail));
  });
}

function renderProducts() {
  let list = [...state.products];
  if (state.activeCategory !== "Semua") {
    list = list.filter((p) => p.category === state.activeCategory);
  }
  if (state.searchQuery.trim()) {
    const q = state.searchQuery.toLowerCase();
    list = list.filter(
      (p) => p.title.toLowerCase().includes(q) || p.description.toLowerCase().includes(q)
    );
  }
  const flashMap = getFlashMap();
  const getPrice = (p) => (flashMap.has(p.id) ? flashMap.get(p.id).flashPrice : p.price);
  if (state.sortBy === "price-asc") list.sort((a, b) => getPrice(a) - getPrice(b));
  if (state.sortBy === "price-desc") list.sort((a, b) => getPrice(b) - getPrice(a));

  const grid = document.getElementById("productGrid");
  if (list.length === 0) {
    grid.innerHTML = `<p class="muted">Produk tidak ditemukan.</p>`;
    return;
  }

  grid.innerHTML = list.map((p) => productCardHtml(p, false)).join("");
  bindCardEvents(grid);
}

function openProductDetail(productId) {
  const p = state.products.find((item) => item.id === productId);
  if (!p) return;
  const flashItem = getFlashMap().get(p.id);
  const unitPrice = flashItem ? flashItem.flashPrice : p.price;
  const maxQty = flashItem ? flashItem.limitQty : 50;
  let qty = 1;

  document.getElementById("detailContent").innerHTML = `
    <img src="${escapeHtml(p.image)}" alt="${escapeHtml(p.title)}" style="display:block;width:100%;aspect-ratio:1/1;object-fit:cover;border-radius:14px;border:1px solid var(--border-strong);margin-bottom:14px;background:var(--ivory-soft);" />
    <span class="product-cat">${escapeHtml(p.category)} • ${escapeHtml(p.packSize || `${p.weightGram}g`)}</span>
    <h3 style="font-family:var(--font-sans);font-size:1.2rem;margin:4px 0 6px;">${escapeHtml(p.title)}</h3>
    <div style="margin-bottom:10px;">
      ${flashItem ? `<span class="price-old" style="display:inline-block;margin-right:8px;">${rp(p.price)}</span>` : ""}
      <strong style="font-size:1.25rem;">${rp(unitPrice)}</strong>
      ${flashItem ? `<div class="flash-limit" style="margin-top:4px;">Flash Sale • Maks. ${flashItem.limitQty} pcs</div>` : ""}
    </div>
    <p class="muted" style="margin-bottom:16px;">${escapeHtml(p.description)}</p>
    <div style="display:flex;justify-content:space-between;align-items:center;gap:12px;">
      <div class="qty-ctrl" style="margin:0;">
        <button id="dtDec" type="button">-</button>
        <span id="dtQty" style="min-width:20px;text-align:center;font-weight:700;">1</span>
        <button id="dtInc" type="button">+</button>
      </div>
      <button id="detailAddBtn" class="btn-primary" style="flex:1;" type="button">Tambah ke Keranjang</button>
    </div>
  `;

  document.getElementById("dtDec").onclick = () => {
    qty = Math.max(1, qty - 1);
    document.getElementById("dtQty").textContent = qty;
  };
  document.getElementById("dtInc").onclick = () => {
    qty = Math.min(maxQty, qty + 1);
    document.getElementById("dtQty").textContent = qty;
  };
  document.getElementById("detailAddBtn").onclick = () => {
    addToCart(p.id, qty);
    document.getElementById("detailModal").classList.add("hidden");
  };
  document.getElementById("detailModal").classList.remove("hidden");
}

// ---------- Cart ----------
function saveCart() {
  localStorage.setItem("dimsum_cart", JSON.stringify(state.cart));
}

function addToCart(productId, addQty = 1) {
  const product = state.products.find((p) => p.id === productId);
  if (!product) return;
  const flashItem = getFlashMap().get(productId);
  const maxQty = flashItem ? flashItem.limitQty : 50;
  const existing = state.cart.find((c) => c.productId === productId);
  const nextQty = (existing ? existing.qty : 0) + addQty;
  if (nextQty > maxQty) {
    showToast(`Maksimal ${maxQty} pcs untuk produk ${flashItem ? "Flash Sale " : ""}ini.`);
    return;
  }
  if (existing) existing.qty = nextQty;
  else state.cart.push({ productId, qty: addQty });
  saveCart();
  renderCart();
  showToast(`✓ ${product.title} masuk keranjang`);
}

function updateQty(productId, delta) {
  const item = state.cart.find((c) => c.productId === productId);
  if (!item) return;
  const flashItem = getFlashMap().get(productId);
  const maxQty = flashItem ? flashItem.limitQty : 50;
  if (delta > 0 && item.qty + delta > maxQty) {
    showToast(`Maksimal ${maxQty} pcs untuk produk Flash Sale ini.`);
    return;
  }
  item.qty += delta;
  if (item.qty <= 0) {
    state.cart = state.cart.filter((c) => c.productId !== productId);
  }
  saveCart();
  renderCart();
}

function getCartDetails() {
  let subtotal = 0;
  let totalQty = 0;
  const items = [];
  const flashMap = getFlashMap();
  for (const c of state.cart) {
    const p = state.products.find((prod) => prod.id === c.productId);
    if (!p) continue;
    const unitPrice = flashMap.has(p.id) ? flashMap.get(p.id).flashPrice : p.price;
    subtotal += unitPrice * c.qty;
    totalQty += c.qty;
    items.push({ ...p, price: unitPrice, qty: c.qty });
  }
  return { items, subtotal, totalQty };
}

function renderCart() {
  const { items, subtotal, totalQty } = getCartDetails();
  document.getElementById("cartCount").textContent = totalQty;
  const bBadge = document.getElementById("bottomCartCount");
  if (bBadge) bBadge.textContent = totalQty;
  document.getElementById("cartSubtotal").textContent = rp(subtotal);
  document.getElementById("proceedCheckoutBtn").disabled = items.length === 0;

  const container = document.getElementById("cartItems");
  if (items.length === 0) {
    container.innerHTML = `<p class="muted" style="text-align:center;margin-top:40px;">Keranjang masih kosong. Yuk pilih dimsum favoritmu!</p>`;
    return;
  }

  container.innerHTML = items
    .map(
      (item) => `
    <div class="cart-item">
      <img src="${escapeHtml(item.image)}" alt="${escapeHtml(item.title)}" />
      <div style="flex:1;">
        <div style="font-weight:700;font-size:0.9rem;">${escapeHtml(item.title)}</div>
        <div style="color:var(--primary);font-weight:700;font-size:0.86rem;">${rp(item.price)}</div>
        <div class="qty-ctrl">
          <button type="button" data-dec="${escapeHtml(item.id)}">-</button>
          <span>${item.qty}</span>
          <button type="button" data-inc="${escapeHtml(item.id)}">+</button>
        </div>
      </div>
    </div>
  `
    )
    .join("");

  container.querySelectorAll("[data-dec]").forEach((b) => (b.onclick = () => updateQty(b.dataset.dec, -1)));
  container.querySelectorAll("[data-inc]").forEach((b) => (b.onclick = () => updateQty(b.dataset.inc, 1)));
}

// ---------- Shipping & Checkout ----------
async function fetchShippingRates(lat, lng, label) {
  state.selectedLocation = { lat, lng, label };
  state.selectedCourier = null;
  updateCheckoutTotals();

  const distEl = document.getElementById("distanceInfo");
  const listEl = document.getElementById("shippingRatesList");
  listEl.innerHTML = `<p class="muted">Menghitung tarif Gojek & Grab...</p>`;

  try {
    let data;
    if (state.isLiveBackend) {
      data = await apiFetch("/api/shipping/rates", {
        method: "POST",
        body: JSON.stringify({ lat, lng, items: state.cart })
      });
    } else {
      // Fallback kalkulasi jarak lokal saat preview tanpa Node.js
      const toRad = (d) => (d * Math.PI) / 180;
      const R = 6371;
      const dLat = toRad(lat - state.store.lat);
      const dLon = toRad(lng - state.store.lng);
      const a = Math.sin(dLat / 2) ** 2 + Math.cos(toRad(state.store.lat)) * Math.cos(toRad(lat)) * Math.sin(dLon / 2) ** 2;
      const distanceKm = Number((R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)) * 1.28).toFixed(1));
      const extraKm = Math.max(0, distanceKm - 2);
      const roundK = (v) => Math.ceil(v / 1000) * 1000;
      data = {
        distanceKm,
        rates: [
          { id: "gojek_instant", courier: "Gojek", service: "GoSend Instant (1-2 Jam)", eta: "45 - 90 Menit", price: roundK(12000 + extraKm * 2800) },
          { id: "grab_instant", courier: "Grab", service: "GrabExpress Instant (1-2 Jam)", eta: "45 - 90 Menit", price: roundK(12000 + extraKm * 2700) },
          { id: "gojek_sameday", courier: "Gojek", service: "GoSend SameDay (3-6 Jam)", eta: "3 - 6 Jam", price: roundK(15000 + extraKm * 1200) },
          { id: "grab_sameday", courier: "Grab", service: "GrabExpress SameDay (3-6 Jam)", eta: "3 - 6 Jam", price: roundK(14500 + extraKm * 1200) }
        ]
      };
    }

    state.shippingRates = data.rates;
    distEl.textContent = `📍 ${label} • Estimasi Jarak: ${data.distanceKm} km`;
    distEl.classList.remove("hidden");

    listEl.innerHTML = data.rates
      .map(
        (r) => `
      <div class="rate-option" data-courier="${escapeHtml(r.id)}">
        <div>
          <strong>${escapeHtml(r.courier)} — ${escapeHtml(r.service)}</strong>
          <div class="muted">${escapeHtml(r.eta)}</div>
        </div>
        <strong>${rp(r.price)}</strong>
      </div>
    `
      )
      .join("");

    listEl.querySelectorAll(".rate-option").forEach((opt) => {
      opt.addEventListener("click", () => {
        listEl.querySelectorAll(".rate-option").forEach((o) => o.classList.remove("selected"));
        opt.classList.add("selected");
        state.selectedCourier = state.shippingRates.find((r) => r.id === opt.dataset.courier);
        updateCheckoutTotals();
      });
    });
  } catch (err) {
    distEl.classList.add("hidden");
    listEl.innerHTML = `<p style="color:var(--primary);font-weight:600;">${escapeHtml(err.message)}</p>`;
  }
}

function updateCheckoutTotals() {
  const { subtotal } = getCartDetails();
  const shipCost = state.selectedCourier ? state.selectedCourier.price : 0;
  document.getElementById("coSubtotal").textContent = rp(subtotal);
  document.getElementById("coShippingCost").textContent = rp(shipCost);
  document.getElementById("coGrandTotal").textContent = rp(subtotal + shipCost);
  document.getElementById("createOrderBtn").disabled = !state.selectedCourier;
}

async function createOrderAndQris() {
  const name = document.getElementById("custName").value.trim();
  const phone = document.getElementById("custPhone").value.trim();
  const address = document.getElementById("custAddress").value.trim();
  const notes = document.getElementById("custNotes").value.trim();

  if (name.length < 2 || phone.length < 9 || address.length < 8) {
    showToast("Mohon lengkapi nama, nomor WhatsApp, dan alamat.");
    return;
  }

  try {
    let order;
    if (state.isLiveBackend) {
      order = await apiFetch("/api/checkout", {
        method: "POST",
        body: JSON.stringify({
          items: state.cart,
          customer: { name, phone, address, notes },
          shipping: {
            lat: state.selectedLocation.lat,
            lng: state.selectedLocation.lng,
            courierId: state.selectedCourier.id
          }
        })
      });
    } else {
      const { subtotal } = getCartDetails();
      const grandTotal = subtotal + state.selectedCourier.price;
      order = {
        orderId: `DIM-PREVIEW-${Date.now().toString(36).toUpperCase()}`,
        grandTotal,
        qris: {
          provider: "sandbox",
          qrImageDataUrl: `https://api.qrserver.com/v1/create-qr-code/?size=240x240&data=DIMSUM-INC-${grandTotal}`,
          expiresAt: Date.now() + 15 * 60_000
        }
      };
    }

    state.activeOrderId = order.orderId;
    document.getElementById("checkoutStep1").classList.add("hidden");
    document.getElementById("checkoutStep2").classList.remove("hidden");
    document.getElementById("qrisOrderId").textContent = order.orderId;
    document.getElementById("qrisImage").src = order.qris.qrImageDataUrl;
    document.getElementById("qrisAmount").textContent = rp(order.grandTotal);

    if (order.qris.provider === "sandbox") {
      document.getElementById("sandboxActions").classList.remove("hidden");
    }

    startPaymentAutoCheck(order.orderId, order.qris.expiresAt);
  } catch (err) {
    showToast(err.message);
  }
}

function startPaymentAutoCheck(orderId, expiresAt) {
  clearInterval(state.pollTimer);
  clearInterval(state.countdownTimer);

  const statusBox = document.getElementById("qrisStatusBox");
  const statusText = document.getElementById("qrisStatusText");
  const timerEl = document.getElementById("qrisTimer");

  statusBox.className = "status-box status-pending";
  statusText.textContent = "Mengecek pembayaran otomatis...";

  state.countdownTimer = setInterval(() => {
    const diff = Math.max(0, Math.floor((expiresAt - Date.now()) / 1000));
    const m = String(Math.floor(diff / 60)).padStart(2, "0");
    const s = String(diff % 60).padStart(2, "0");
    timerEl.textContent = `${m}:${s}`;
    if (diff === 0) clearInterval(state.countdownTimer);
  }, 1000);

  if (!state.isLiveBackend) return;

  state.pollTimer = setInterval(async () => {
    try {
      const res = await apiFetch(`/api/orders/${encodeURIComponent(orderId)}/status`, { method: "GET" });
      if (res.status === "PAID") {
        handlePaymentSuccess();
      } else if (res.status === "EXPIRED") {
        clearInterval(state.pollTimer);
        statusText.textContent = "QRIS Kedaluwarsa. Silakan buat ulang pesanan.";
      }
    } catch {
      // ignore transient poll error
    }
  }, 3000);
}

function handlePaymentSuccess() {
  clearInterval(state.pollTimer);
  clearInterval(state.countdownTimer);
  const statusBox = document.getElementById("qrisStatusBox");
  statusBox.className = "status-box status-paid";
  statusBox.innerHTML = `<span>✅ Pembayaran QRIS Diterima! Pesanan segera diproses & dikirim kurir.</span>`;
  document.getElementById("sandboxActions").classList.add("hidden");
  state.cart = [];
  saveCart();
  renderCart();
  showToast("Pembayaran berhasil terverifikasi otomatis!");
}

// ---------- Events ----------
function bindEvents() {
  document.getElementById("searchInput").addEventListener("input", (e) => {
    state.searchQuery = e.target.value;
    renderProducts();
  });

  document.getElementById("sortSelect").addEventListener("change", (e) => {
    state.sortBy = e.target.value;
    renderProducts();
  });

  const toggleCart = (open) => {
    document.getElementById("cartOverlay").classList.toggle("hidden", !open);
    document.getElementById("cartDrawer").classList.toggle("hidden", !open);
  };

  document.getElementById("openCartBtn").onclick = () => toggleCart(true);
  const ecomToggle = document.getElementById("ecomToggleBtn");
  const ecomMenu = document.getElementById("ecomMenu");
  if (ecomToggle && ecomMenu) {
    ecomToggle.onclick = (e) => {
      e.stopPropagation();
      const isHidden = ecomMenu.classList.toggle("hidden");
      ecomToggle.setAttribute("aria-expanded", String(!isHidden));
    };
    document.addEventListener("click", () => {
      ecomMenu.classList.add("hidden");
      ecomToggle.setAttribute("aria-expanded", "false");
    });
  }
  const bCart = document.getElementById("bottomCartBtn");
  if (bCart) bCart.onclick = () => toggleCart(true);
  document.getElementById("closeCartBtn").onclick = () => toggleCart(false);
  document.getElementById("cartOverlay").onclick = () => toggleCart(false);
  document.getElementById("closeDetailBtn").onclick = () =>
    document.getElementById("detailModal").classList.add("hidden");

  const openCheckout = () => {
    if (state.cart.length === 0) {
      showToast("Keranjang masih kosong, pilih dimsum dulu ya!");
      return;
    }
    toggleCart(false);
    if (state.currentUser) {
      const nEl = document.getElementById("custName");
      const pEl = document.getElementById("custPhone");
      if (nEl && !nEl.value && state.currentUser.name) nEl.value = state.currentUser.name;
      if (pEl && !pEl.value && state.currentUser.phone) pEl.value = state.currentUser.phone;
    }
    document.getElementById("checkoutStep1").classList.remove("hidden");
    document.getElementById("checkoutStep2").classList.add("hidden");
    updateCheckoutTotals();
    document.getElementById("checkoutModal").classList.remove("hidden");
  };

  document.getElementById("proceedCheckoutBtn").onclick = openCheckout;
  const bCo = document.getElementById("bottomCheckoutBtn");
  if (bCo) bCo.onclick = openCheckout;

  document.getElementById("closeCheckoutBtn").onclick = () => {
    clearInterval(state.pollTimer);
    clearInterval(state.countdownTimer);
    document.getElementById("checkoutModal").classList.add("hidden");
  };

  document.getElementById("useGpsBtn").onclick = () => {
    if (!navigator.geolocation) {
      showToast("Browser tidak mendukung GPS.");
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => fetchShippingRates(pos.coords.latitude, pos.coords.longitude, "Lokasi GPS Anda"),
      () => showToast("Gagal mengakses GPS. Silakan pilih kota atau cari alamat.")
    );
  };

  document.getElementById("searchLocationBtn").onclick = async () => {
    const q = document.getElementById("addressSearchInput").value.trim();
    if (!q) return;
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&countrycodes=id&limit=1&q=${encodeURIComponent(q)}`
      );
      const data = await res.json();
      if (!data.length) {
        showToast("Lokasi tidak ditemukan, coba nama kecamatan/kota.");
        return;
      }
      fetchShippingRates(Number(data[0].lat), Number(data[0].lon), data[0].display_name.split(",")[0]);
    } catch {
      showToast("Gagal mencari lokasi.");
    }
  };

  document.querySelectorAll(".city-chip").forEach((chip) => {
    chip.addEventListener("click", () => {
      fetchShippingRates(Number(chip.dataset.lat), Number(chip.dataset.lng), chip.textContent);
    });
  });

  document.getElementById("createOrderBtn").onclick = createOrderAndQris;

  document.getElementById("simulatePayBtn").onclick = async () => {
    if (state.isLiveBackend && state.activeOrderId) {
      await apiFetch("/api/sandbox/confirm-payment", {
        method: "POST",
        body: JSON.stringify({ orderId: state.activeOrderId })
      });
    }
    handlePaymentSuccess();
  };
}

// ---------- Auth & Profile Validation ----------
const VALID_OP_PREFIXES = new Set([
  "0811", "0812", "0813", "0821", "0822", "0823", "0851", "0852", "0853",
  "0814", "0815", "0816", "0855", "0856", "0857", "0858",
  "0817", "0818", "0819", "0859", "0877", "0878",
  "0831", "0832", "0833", "0838",
  "0895", "0896", "0897", "0898", "0899",
  "0881", "0882", "0883", "0884", "0885", "0886", "0887", "0888", "0889"
]);

function getMaxDob17() {
  const d = new Date();
  d.setFullYear(d.getFullYear() - 17);
  return d.toISOString().split("T")[0];
}

function validateNameClient(name) {
  const clean = String(name || "").trim().replace(/\s+/g, " ");
  if (clean.length < 2) return "Nama lengkap minimal 2 huruf.";
  if (!/^[A-Za-z\s]+$/.test(clean)) return "Nama hanya boleh huruf dan spasi (tanpa angka/simbol).";
  return null;
}

function validatePhoneClient(phone) {
  const digits = String(phone || "").trim();
  if (!/^\d+$/.test(digits)) return "Nomor HP hanya boleh angka.";
  if (digits.length < 10 || digits.length > 12) return "Nomor HP harus 10–12 digit.";
  const prefix = digits.slice(0, 4);
  if (!VALID_OP_PREFIXES.has(prefix)) return `Kode operator (${prefix}) tidak valid (gunakan 0811–0899).`;
  if (/(\d)\1{4,}/.test(digits)) return "Nomor HP tidak valid (angka sama berulang).";
  const sub = digits.slice(4);
  if (new Set(sub.split("")).size < 3) return "Nomor HP tidak valid (terlalu banyak angka berulang).";
  if ("0123456789012".includes(sub) || "9876543210987".includes(sub)) return "Nomor HP tidak boleh berurutan asal.";
  return null;
}

function validateDobClient(dobStr) {
  if (!dobStr) return "Tanggal lahir wajib diisi.";
  if (dobStr > getMaxDob17()) return "Usia minimal untuk mendaftar adalah 17 tahun.";
  return null;
}

function showAuthError(boxId, msg) {
  const box = document.getElementById(boxId);
  if (!box) return;
  if (!msg) {
    box.classList.add("hidden");
    box.textContent = "";
  } else {
    box.textContent = msg;
    box.classList.remove("hidden");
  }
}

function renderProfileButton() {
  const btn = document.getElementById("openProfileBtn");
  const svg = document.getElementById("profileIconSvg");
  const txt = document.getElementById("profileAvatarText");
  if (!btn || !svg || !txt) return;

  if (state.currentUser) {
    btn.classList.add("logged-in");
    svg.classList.add("hidden");
    txt.classList.remove("hidden");
    txt.textContent = (state.currentUser.name || "U").trim().charAt(0).toUpperCase();
  } else {
    btn.classList.remove("logged-in");
    svg.classList.remove("hidden");
    txt.classList.add("hidden");
    txt.textContent = "";
  }
}

function openAuthModal() {
  showAuthError("authErrorBox", null);
  showAuthError("profileErrorBox", null);
  const maxDob = getMaxDob17();
  const regDob = document.getElementById("regDob");
  const profDob = document.getElementById("profDob");
  if (regDob) regDob.max = maxDob;
  if (profDob) profDob.max = maxDob;

  if (state.currentUser) {
    document.getElementById("authFormsView").classList.add("hidden");
    document.getElementById("profileView").classList.remove("hidden");
    document.getElementById("profileEmailLabel").textContent = `${state.currentUser.email} (${state.currentUser.provider === "google" ? "Google" : "Manual"})`;
    document.getElementById("profName").value = state.currentUser.name || "";
    document.getElementById("profPhone").value = state.currentUser.phone || "";
    document.getElementById("profDob").value = state.currentUser.dob || "";
  } else {
    document.getElementById("authFormsView").classList.remove("hidden");
    document.getElementById("profileView").classList.add("hidden");
  }
  document.getElementById("authModal").classList.remove("hidden");
}

async function initAuth() {
  if (!state.isLiveBackend) return;
  try {
    const [meRes, cfgRes] = await Promise.all([
      apiFetch("/api/auth/me", { method: "GET" }),
      apiFetch("/api/auth/config", { method: "GET" })
    ]);
    state.currentUser = meRes.user || null;
    state.googleClientId = cfgRes.googleClientId || "";
    renderProfileButton();

    if (state.googleClientId) {
      const s = document.createElement("script");
      s.src = "https://accounts.google.com/gsi/client";
      s.async = true;
      s.defer = true;
      s.onload = () => {
        if (window.google?.accounts?.id) {
          window.google.accounts.id.initialize({
            client_id: state.googleClientId,
            callback: async (resp) => {
              try {
                const data = await apiFetch("/api/auth/google", {
                  method: "POST",
                  body: JSON.stringify({ credential: resp.credential })
                });
                state.currentUser = data.user;
                renderProfileButton();
                openAuthModal();
                showToast(`Selamat datang, ${data.user.name}!`);
              } catch (err) {
                showAuthError("authErrorBox", err.message);
              }
            }
          });
          ["googleBtnLoginSlot", "googleBtnRegisterSlot"].forEach((id) => {
            const slot = document.getElementById(id);
            if (slot) window.google.accounts.id.renderButton(slot, { theme: "outline", size: "large", shape: "pill", width: 320 });
          });
          document.getElementById("googleLoginFallbackBtn")?.classList.add("hidden");
          document.getElementById("googleRegisterFallbackBtn")?.classList.add("hidden");
        }
      };
      document.head.appendChild(s);
    }
  } catch {
    // ignore auth init error
  }

  // Real-time input enforcement: Nama hanya huruf, HP hanya angka 10-12 digit
  ["regName", "profName"].forEach((id) => {
    const el = document.getElementById(id);
    if (el) el.addEventListener("input", () => { el.value = el.value.replace(/[^A-Za-z\s]/g, ""); });
  });
  ["regPhone", "profPhone"].forEach((id) => {
    const el = document.getElementById(id);
    if (el) el.addEventListener("input", () => { el.value = el.value.replace(/\D/g, "").slice(0, 12); });
  });

  document.getElementById("openProfileBtn").onclick = openAuthModal;
  const bottomProfileBtn = document.getElementById("bottomProfileBtn");
  if (bottomProfileBtn) bottomProfileBtn.onclick = openAuthModal;

  const viewModeToggleBtn = document.getElementById("viewModeToggleBtn");
  const applyViewMode = (isMobile) => {
    document.body.classList.toggle("force-mobile", isMobile);
    if (viewModeToggleBtn) {
      viewModeToggleBtn.textContent = isMobile ? "💻 PC Mode" : "📱 Mobile Mode";
    }
  };
  if (localStorage.getItem("dimsum_view_mode") === "mobile") {
    applyViewMode(true);
  }
  if (viewModeToggleBtn) {
    viewModeToggleBtn.onclick = () => {
      const nextMobile = !document.body.classList.contains("force-mobile");
      localStorage.setItem("dimsum_view_mode", nextMobile ? "mobile" : "pc");
      applyViewMode(nextMobile);
    };
  }

  document.getElementById("closeAuthBtn").onclick = () => document.getElementById("authModal").classList.add("hidden");

  document.getElementById("tabLoginBtn").onclick = () => {
    showAuthError("authErrorBox", null);
    document.getElementById("tabLoginBtn").classList.add("active");
    document.getElementById("tabRegisterBtn").classList.remove("active");
    document.getElementById("loginForm").classList.remove("hidden");
    document.getElementById("registerForm").classList.add("hidden");
  };

  document.getElementById("tabRegisterBtn").onclick = () => {
    showAuthError("authErrorBox", null);
    document.getElementById("tabRegisterBtn").classList.add("active");
    document.getElementById("tabLoginBtn").classList.remove("active");
    document.getElementById("registerForm").classList.remove("hidden");
    document.getElementById("loginForm").classList.add("hidden");
  };

  document.getElementById("loginForm").onsubmit = async (e) => {
    e.preventDefault();
    showAuthError("authErrorBox", null);
    try {
      const data = await apiFetch("/api/auth/login", {
        method: "POST",
        body: JSON.stringify({
          identifier: document.getElementById("loginIdentifier").value.trim(),
          password: document.getElementById("loginPassword").value
        })
      });
      state.currentUser = data.user;
      renderProfileButton();
      document.getElementById("authModal").classList.add("hidden");
      showToast(`Selamat datang kembali, ${data.user.name}!`);
    } catch (err) {
      showAuthError("authErrorBox", err.message);
    }
  };

  document.getElementById("registerForm").onsubmit = async (e) => {
    e.preventDefault();
    const name = document.getElementById("regName").value;
    const email = document.getElementById("regEmail").value.trim();
    const phone = document.getElementById("regPhone").value;
    const dob = document.getElementById("regDob").value;
    const password = document.getElementById("regPassword").value;

    const errMsg = validateNameClient(name) || validatePhoneClient(phone) || validateDobClient(dob);
    if (errMsg) return showAuthError("authErrorBox", errMsg);

    showAuthError("authErrorBox", null);
    try {
      const data = await apiFetch("/api/auth/register", {
        method: "POST",
        body: JSON.stringify({ name, email, phone, dob, password })
      });
      state.currentUser = data.user;
      renderProfileButton();
      document.getElementById("authModal").classList.add("hidden");
      showToast(`Akun ${data.user.name} berhasil dibuat!`);
    } catch (err) {
      showAuthError("authErrorBox", err.message);
    }
  };

  const handleGoogleFallback = async () => {
    const email = prompt("Masukkan Email Google Anda (Mode Lokal sebelum GOOGLE_CLIENT_ID diisi):");
    if (!email) return;
    const name = prompt("Masukkan Nama Lengkap Google Anda (hanya huruf):");
    if (!name) return;
    const nameErr = validateNameClient(name);
    if (nameErr) return showAuthError("authErrorBox", nameErr);

    try {
      const data = await apiFetch("/api/auth/google", {
        method: "POST",
        body: JSON.stringify({ email, name })
      });
      state.currentUser = data.user;
      renderProfileButton();
      openAuthModal();
      showToast(`Masuk via Google sebagai ${data.user.name}!`);
    } catch (err) {
      showAuthError("authErrorBox", err.message);
    }
  };

  document.getElementById("googleLoginFallbackBtn").onclick = handleGoogleFallback;
  document.getElementById("googleRegisterFallbackBtn").onclick = handleGoogleFallback;

  document.getElementById("profileForm").onsubmit = async (e) => {
    e.preventDefault();
    const name = document.getElementById("profName").value;
    const phone = document.getElementById("profPhone").value;
    const dob = document.getElementById("profDob").value;

    const errMsg = validateNameClient(name) || validatePhoneClient(phone) || validateDobClient(dob);
    if (errMsg) return showAuthError("profileErrorBox", errMsg);

    showAuthError("profileErrorBox", null);
    try {
      const data = await apiFetch("/api/auth/profile", {
        method: "POST",
        body: JSON.stringify({ name, phone, dob })
      });
      state.currentUser = data.user;
      renderProfileButton();
      showToast("Profil berhasil disimpan!");
    } catch (err) {
      showAuthError("profileErrorBox", err.message);
    }
  };

  document.getElementById("logoutBtn").onclick = async () => {
    await apiFetch("/api/auth/logout", { method: "POST", body: "{}" });
    state.currentUser = null;
    renderProfileButton();
    document.getElementById("authModal").classList.add("hidden");
    showToast("Anda telah keluar.");
  };
}

function initSecurityShield() {
  const isEditable = (el) =>
    el && (el.tagName === "INPUT" || el.tagName === "TEXTAREA" || el.tagName === "SELECT" || el.isContentEditable);

  // Anti klik kanan (inspect element / save image)
  document.addEventListener("contextmenu", (e) => {
    e.preventDefault();
    showToast("Konten dilindungi.");
  });

  // Anti drag gambar & seleksi/copas di luar form input
  document.addEventListener("dragstart", (e) => e.preventDefault());
  document.addEventListener("selectstart", (e) => {
    if (!isEditable(e.target)) e.preventDefault();
  });
  document.addEventListener("copy", (e) => {
    if (!isEditable(document.activeElement)) {
      e.preventDefault();
      showToast("Fitur salin dinonaktifkan.");
    }
  });
  document.addEventListener("cut", (e) => {
    if (!isEditable(document.activeElement)) e.preventDefault();
  });

  // Blokir shortcut DevTools, View Source, Save Page, Print
  document.addEventListener("keydown", (e) => {
    const key = (e.key || "").toLowerCase();
    const ctrlOrCmd = e.ctrlKey || e.metaKey;

    if (e.key === "F12") {
      e.preventDefault();
      return false;
    }
    if (ctrlOrCmd && e.shiftKey && ["i", "j", "c", "k"].includes(key)) {
      e.preventDefault();
      return false;
    }
    if (ctrlOrCmd && ["u", "s", "p"].includes(key)) {
      e.preventDefault();
      return false;
    }
    if (ctrlOrCmd && ["c", "x", "a"].includes(key) && !isEditable(document.activeElement)) {
      e.preventDefault();
      return false;
    }
  });

  // Deteksi DevTools terbuka (docked) -> aktifkan layar pelindung anti-intip
  let shieldEl = null;
  const setShieldVisible = (visible) => {
    if (visible && !shieldEl) {
      shieldEl = document.createElement("div");
      shieldEl.className = "security-shield-overlay";
      shieldEl.innerHTML = `
        <h2>MODE KEAMANAN AKTIF</h2>
        <p>Inspeksi atau alat pengembang (DevTools) terdeteksi terbuka. Tutup DevTools untuk melanjutkan melihat katalog Dimsum Inc Frozen Official.</p>
      `;
      document.body.appendChild(shieldEl);
    } else if (!visible && shieldEl) {
      shieldEl.remove();
      shieldEl = null;
    }
  };

  const checkDevTools = () => {
    const widthGap = window.outerWidth - window.innerWidth > 180;
    const heightGap = window.outerHeight - window.innerHeight > 180;
    setShieldVisible(widthGap || heightGap);
  };

  setInterval(checkDevTools, 1000);
  window.addEventListener("resize", checkDevTools);

  if (typeof console !== "undefined" && console.log) {
    console.log(
      "%cSTOP! Area ini dilindungi sistem keamanan Dimsum Inc Frozen Official.",
      "color:#E8B84B;background:#141312;font-size:14px;font-weight:bold;padding:8px 12px;border-radius:6px;"
    );
  }
}

initSecurityShield();
init();
