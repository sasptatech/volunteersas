// chat-groups.js — SAS PTA community chat groups shown on community.html.
//
// Source of truth mirrored from the PTA site's "Community Chat Groups" page:
// https://sites.google.com/view/saspta/home/extra-info
// These are parent-to-parent (P2P) groups — see DISCLAIMER below. To update, edit
// this file and push (the community page reads it directly; no database).
//
// Each group: { name, note?, section?, links: [url | {url,label}] }. Link kind
// (WhatsApp / Facebook / WeChat / LINE / form / email) is inferred from the URL.

export const DISCLAIMER =
  "These groups are run by parents, for parents (P2P). Except where labelled “PTA”, " +
  "they are not affiliated with or moderated by the school or the PTA. In line with " +
  "school social-media guidelines they are for adults only — students may not join. " +
  "By joining you agree to abide by the SAS Community Norms: contribute productively " +
  "and positively, assume positive intent, share accurate information, and go to the source.";

export const SOURCE_URL = "https://sites.google.com/view/saspta/home/extra-info";

export const CATEGORIES = [
  {
    id: "pta",
    title: "PTA Volunteer Groups",
    icon: "🦅",
    intro: "Hear about current volunteer needs for PTA and school events. Join the whole-school chat and/or your division.",
    groups: [
      { name: "SAS PTA Volunteers 🦅", note: "Whole school — be first to hear about volunteer needs", links: ["https://chat.whatsapp.com/BxsMyDxb7PhK3hjWhHEO8k"] },
      { name: "ELC PTA Volunteers", links: ["https://chat.whatsapp.com/BC7rPkJvtMD0NmTXgsYRGw"] },
      { name: "ES PTA Volunteers", links: ["https://chat.whatsapp.com/CJ9bhBNp3lIFQ7qvTKlrjG"] },
      { name: "MS PTA Volunteers", links: ["https://chat.whatsapp.com/BSlzy9UWiQ7HzEVxESB44n"] },
      { name: "HS PTA Volunteers", links: ["https://chat.whatsapp.com/CjnSaQdoiIJ31RemiKubFk"] },
      { name: "SAS PTA Dads", links: ["https://chat.whatsapp.com/H1BNakBtpTrJp3yekrZ1em"] },
    ],
  },
  {
    id: "grade",
    title: "Grade-Level Parent Groups",
    icon: "🎓",
    intro: "By graduating class. Find your child's cohort.",
    groups: [
      { section: "Elementary School", name: "Class of 2041 (Pre-School)", links: ["https://chat.whatsapp.com/ISMc5DzS91W1xIzCTGDfnY?s=cl&p=i&ilr=0&amv=2"] },
      { section: "Elementary School", name: "Class of 2040 (Pre-K)", links: ["https://chat.whatsapp.com/Ff2Plkt9thnGV1JaV5EqoN?mode=ac_t"] },
      { section: "Elementary School", name: "Class of 2039 (Kindergarten)", links: ["https://chat.whatsapp.com/CbPFqwLryDXEW7KF5e8EyM?s=cl&p=i&mlu=4&ilr=4"] },
      { section: "Elementary School", name: "Class of 2038 (Grade 1)", links: ["https://chat.whatsapp.com/HlgqJyRMC8GE2k6bWg8FIt"] },
      { section: "Elementary School", name: "Class of 2037 (Grade 2)", links: ["https://chat.whatsapp.com/DkTmKHOiRn7EjlqfhjFIBr?s=cl&p=i&mlu=4&ilr=4"] },
      { section: "Elementary School", name: "Class of 2036 (Grade 3)", links: ["https://chat.whatsapp.com/KS8r4TLLdPR7e2wVETsEt2"] },
      { section: "Elementary School", name: "Class of 2035 (Grade 4)", links: ["https://chat.whatsapp.com/Jx9aRxoJhGw53xUQ2O4X8z"] },
      { section: "Elementary School", name: "Class of 2034 (Grade 5)", links: ["https://chat.whatsapp.com/I5gCuJiT8kC7rVg9yCRmGJ?s=hd&p=i&mlu=0"] },
      { section: "Middle School", name: "Class of 2033 (Grade 6)", links: ["https://chat.whatsapp.com/KgljDQaEvTHLDjjl7L1Roa?s=cl&p=i&ilr=2&amv=0"] },
      { section: "Middle School", name: "Class of 2032 (Grade 7)", links: ["https://chat.whatsapp.com/C1AXn86NcgZASje4Q8TTqx?s=cl&p=i&ilr=4"] },
      { section: "Middle School", name: "Class of 2031 (Grade 8)", links: ["https://chat.whatsapp.com/BOe83S96QPZC1O49HeoEWS?mode=gi_t"] },
      { section: "High School", name: "Class of 2030 (Grade 9)", links: ["https://chat.whatsapp.com/BFM1I0cMltn08bVc8JPAkG"] },
      { section: "High School", name: "Class of 2029 (Grade 10)", links: ["https://chat.whatsapp.com/EZFn5E1PONtBDB9iVaHeeM", "https://www.facebook.com/groups/sasclassof2029/?ref=share_group_link"] },
      { section: "High School", name: "Class of 2028 (Grade 11)", links: ["https://chat.whatsapp.com/BwbGbjarmIeL6GdZtZgZKo", "https://www.facebook.com/groups/4097414680376609"] },
      { section: "High School", name: "Class of 2027 (Grade 12)", links: ["https://chat.whatsapp.com/FwZgEOVC3ZRIIyqdpZ6CYP", "https://www.facebook.com/groups/290132542316469"] },
      { section: "High School", name: "SAS PTA High School Parents (PTA-run)", links: ["https://www.facebook.com/groups/344274059362707/"] },
      { section: "Alumni", name: "Class of 2026", links: ["https://chat.whatsapp.com/EkN5omHfzIu3HcBzkxNU8T"] },
      { section: "Alumni", name: "Class of 2025", links: ["https://chat.whatsapp.com/BlIr7vACJdS25yJ8HvnFgZ", "https://www.facebook.com/groups/196886731107264/?ref=share"] },
      { section: "Alumni", name: "Class of 2024", links: ["https://chat.whatsapp.com/9Nq7AQQl3my41sKoHoJA9R"] },
    ],
  },
  {
    id: "country",
    title: "Country, Culture & Language",
    icon: "🌏",
    groups: [
      { name: "SAS Anzacs 🇦🇺🇳🇿", links: ["https://chat.whatsapp.com/HwewC1jvFlt2Qhxz73TndF?mode=gi_t"] },
      { name: "SAS Bangladesh 🇧🇩", links: ["https://chat.whatsapp.com/IUNpm10vq4V4oDEiDXKjXP"] },
      { name: "SAS Cambodia 🇰🇭", links: ["https://chat.whatsapp.com/LmJL0D8UUGk7uBAXbRq4Z3"] },
      { name: "SAS Canada 🇨🇦", links: ["https://chat.whatsapp.com/GaejkNUPVjVHBQ474HyTls"] },
      { name: "Filipino Community @ SAS 🇵🇭", links: ["https://chat.whatsapp.com/HdnxDGFGirTJ16eL7EkloM"] },
      { name: "SAS Hong Kong 🇭🇰", links: ["https://chat.whatsapp.com/DjzHGCEUJUVFQgDqdko2QI"] },
      { name: "SASsy Indians Group 🇮🇳", note: "Fill out the form to join", links: [{ url: "https://forms.gle/gJ1Y71yjkSWvVhc58", label: "Join via form" }] },
      { name: "SAS Masti Group", note: "Parents of Indian origin", links: ["https://chat.whatsapp.com/C5TZer9WdFEDOUlaBcV0Nr?s=cl&p=i&mlu=0&amv=0"] },
      { name: "SAS Indonesian Community 🇮🇩", links: ["https://chat.whatsapp.com/Em5NxS3NX815foKbZ40l78"] },
      { name: "SAS Israel Community 🇮🇱", links: ["https://chat.whatsapp.com/FtPf5nmZVM0FqlWotePpK7"] },
      { name: "SAS Japanese Community 🇯🇵", links: ["https://chat.whatsapp.com/CjY5jJkIiEU35F23Bx36Vd"] },
      { name: "SAS Korean Parents Community 🇰🇷", links: ["https://www.facebook.com/groups/2380532078902053"] },
      { name: "SAS Korean Group 🇰🇷", links: ["https://chat.whatsapp.com/I01muKOiyT9L9cKBI5qN8j"] },
      { name: "SAS Latin Flavor", note: "en Español", links: ["https://chat.whatsapp.com/1qNIoBwJgXkGXL1oAK3JQc"] },
      { name: "Pakistan Parents Group 🇵🇰", links: ["https://chat.whatsapp.com/IPIeH7VNKl3EpwQheFeGm6"] },
      { name: "Parlez-vous français? 🇫🇷", links: ["https://chat.whatsapp.com/CvebGxMDQ2o6vCib5PTlCN"] },
      { name: "SAS Team Singapore 🇸🇬", links: ["https://chat.whatsapp.com/BEp5qQwD5jZ4xpNZ2Talud"] },
      { name: "SAS Taiwan Community 🇹🇼", links: ["https://chat.whatsapp.com/EIx069878oVICC5U8rHTVp?s=sh&p=i&mlu=4"] },
      { name: "SAS Thai Inter Fair 🇹🇭", links: ["https://chat.whatsapp.com/BW7JUcAdLmrGdIaACQprop"] },
      { name: "Turkish Mothers Group (SAS Anneleri) 🇹🇷", links: ["https://chat.whatsapp.com/E3DxPdZJi2tDHYOEzKfjzI"] },
      { name: "SAS USA 🇺🇸", links: ["https://chat.whatsapp.com/CLC4Y77V3ThEfVJSVRsiP8?mode=gi_t"] },
      { name: "SAS Vietnam 🇻🇳", links: ["https://chat.whatsapp.com/FPHbeZcEvEeGSascTULZvM"] },
    ],
  },
  {
    id: "faith",
    title: "Faith-Based Groups",
    icon: "🙏",
    groups: [
      { name: "Chinese Christian Parents' Group", links: ["https://chat.whatsapp.com/BUurZW6TttR8aOlOdrs03M"] },
      { name: "Christian Parents Group", note: "Email your full name and your child(ren)'s names & grade levels to join", links: [{ url: "mailto:cpgprays2020@gmail.com", label: "Email to join" }] },
      { name: "Jewish Community at SAS", note: "Email your name & mobile number and your child(ren)'s names & grade levels to join", links: [{ url: "mailto:sasjewishfamilygrouprequest@gmail.com", label: "Email to join" }] },
      { name: "SAS Muslim Community 🕌", note: "For Muslim parents to connect and collaborate", links: ["https://chat.whatsapp.com/Hxk51Q85OSR9fgZEynnPND"] },
    ],
  },
  {
    id: "celebrate",
    title: "Cultural & Holiday Celebrations",
    icon: "🎉",
    intro: "“SAS Celebrates!” groups. Questions? Email saspta.secretary@gmail.com.",
    groups: [
      { name: "SAS Celebrates! Halloween", links: ["https://chat.whatsapp.com/BGNk1fTWBSfH4YkMn0MnPB"] },
      { name: "SAS Celebrates! Thanksgiving", links: ["https://chat.whatsapp.com/Kq6SHOW8y75ABisLeqsxoA"] },
      { name: "SAS Celebrates! Deepawali", links: ["https://chat.whatsapp.com/FaQmsoDXBhVEFpnfCNclm2"] },
      { name: "SAS Celebrates! Christmas", links: ["https://chat.whatsapp.com/JcPzx0SxLP49VXJk1YNPSH"] },
      { name: "SAS Celebrates! Lunar New Year", links: ["https://chat.whatsapp.com/IUcRm8sqvQrH9NUyDcFt98"] },
      { name: "SAS Celebrates! Black History Month", links: ["https://chat.whatsapp.com/KVxrDz3RsLgCrxSjfkwoEn"] },
      { name: "SAS Celebrates! Passover", links: ["https://chat.whatsapp.com/IhIOhhOHwsbAbb8PFn9e0A"] },
      { name: "SAS Celebrates! Ramadan & Hari Raya", links: ["https://chat.whatsapp.com/LOUL4mj5IVV8QNsKrhXeB9"] },
      { name: "SAS Celebrates! Hispanic Heritage", links: ["https://chat.whatsapp.com/KM6ln9GOfrg5osts1meumW"] },
    ],
  },
  {
    id: "interest",
    title: "Common Interest Groups",
    icon: "💛",
    groups: [
      { name: "All the Single Mamas!", links: ["https://chat.whatsapp.com/FguwnFsRbfw0IaEp4UVijY"] },
      { name: "SAS Arts & Activities 🎨", note: "Performances, art shows, after-school arts & clubs", links: ["https://chat.whatsapp.com/IyM8VbS0yFK4QHa0qX3W0s?mode=gi_t"] },
      { name: "SAS Parents for Responsible Tech", links: ["https://chat.whatsapp.com/INSKPUA7Zmn3pGmeAzbeK6?s=cl&p=i&ilr=4"] },
      { name: "SAS Bus 🚌 Chatter", links: ["https://chat.whatsapp.com/EH7B6a7LDyu3sCHFXjKfK1"] },
      { name: "SAS Buy & Sell", links: ["https://chat.whatsapp.com/FByU3jIsf8GDM5fOFX2Qn1?s=cl&p=i&ilr=0&amv=2"] },
      { name: "SAS Carpool Group", note: "Find parents to carpool, or share a Grab / private driver", links: ["https://chat.whatsapp.com/HzbxrLQKp1cFzgj5nlCOzd"] },
      { name: "SAS Chinese Immersion Parents", links: ["https://chat.whatsapp.com/E76yZMVhTdEEgcCJsj3fLs"] },
      { name: "SAS 🐾 Doggos", links: ["https://chat.whatsapp.com/IAEqq1fhMGtHP3U42OQWwi"] },
      { name: "SAS EAL Support", note: "Families of students in English as an Additional Language support", links: ["https://chat.whatsapp.com/IL7MkmVcXOm4iCO6zcJ8H9"] },
      { name: "SAS Gluten-Free", links: [{ url: "https://forms.gle/5R9i3UeeBcmRuVn66", label: "Join via form" }] },
      { name: "SAS 🥾 Hikers", note: "Long walks, hiking & exploring nature in Singapore", links: ["https://chat.whatsapp.com/GvVbe6coimgLHCzLoXyNPU"] },
      { name: "Exploring Singapore", note: "Explore Singapore with fellow SAS parents", links: ["https://chat.whatsapp.com/Kex6k7jQSzPLnVVaN0VRtL"] },
      { name: "SAS Gardeners 🪴", links: ["https://chat.whatsapp.com/KK0Hg0Gz27ZBPNFjO0JIv5"] },
      { name: "SAS Music Makers 🎸", links: ["https://chat.whatsapp.com/LSZ1zbRpJjsLwRiejCfTtk"] },
      { name: "SAS National Service 🇸🇬", note: "For parents whose sons will do National Service", links: ["https://chat.whatsapp.com/FWIYU9iIyTP6HiFmPqq6c7"] },
      { name: "SAS Parents Small Business 🦅", note: "Connect with other business owners in the SAS community", links: ["https://chat.whatsapp.com/F1AifALeXOz3VP2YzOkx8o"] },
      { name: "SAS Talking Sex & ID", links: ["https://chat.whatsapp.com/C8NwOiH5Ur53JyU4pxtxdk"] },
      { name: "Parent Support Group for Mental Health (SAS PSFMH)", links: [{ url: "https://docs.google.com/forms/d/e/1FAIpQLSfmbjV6ojQfsPxLXOLXm8wy_DLr3rbueJzl0Ie-J738Scr5xw/viewform", label: "Join via form" }] },
      { name: "PASS — Parents and Support Services", links: ["https://chat.whatsapp.com/DU9t6cfLckLIIIZsjTa35R"] },
      { name: "PoND — Parents of Neuro-Diverse students", links: [{ url: "https://docs.google.com/forms/d/e/1FAIpQLSeqZ164hii_7BE1tl6IRrnsbotLk90lN2ePT-OK1kOQ9TRsSQ/viewform?usp=pp_url", label: "Join via form" }] },
      { name: "Public Speaking Club SAS", note: "Join the Facebook group to be added to the WhatsApp group", links: ["https://www.facebook.com/groups/publicspeakingclubsas/?ref=share"] },
      { name: "SAS Travel Tips & Recommendations", links: ["https://chat.whatsapp.com/BpZnvahMN5RDxIXzRpcBgz"] },
      { name: "Summer Opportunities for SAS Students", links: ["https://chat.whatsapp.com/LBa3ZDnGAt02cCQEJlJeUl"] },
    ],
  },
  {
    id: "intfair",
    title: "International Fair Teams",
    icon: "🌐",
    intro: "Volunteer teams for the International Fair, by country.",
    groups: [
      { name: "International Fair Volunteers", links: ["https://chat.whatsapp.com/CeC89oFzcX0AfdCpP0xTFi"] },
      { name: "Canada 🇨🇦", links: ["https://chat.whatsapp.com/GaejkNUPVjVHBQ474HyTls"] },
      { name: "China 🇨🇳", links: [{ url: "https://u.wechat.com/ENo50aPWglJEtJg1FJjE--A", label: "Join on WeChat" }] },
      { name: "Europe", links: ["https://chat.whatsapp.com/FKGuU23ybxo5pyxHrdBMWe"] },
      { name: "India 🇮🇳", links: ["https://chat.whatsapp.com/Hf0Y5Il4u8fB0BEyU0kA3U"] },
      { name: "Indonesia 🇮🇩", links: ["https://chat.whatsapp.com/Em5NxS3NX815foKbZ40l78"] },
      { name: "Italy 🇮🇹", links: ["https://chat.whatsapp.com/KrMRrDCfFzf2RIXHXXiIWi"] },
      { name: "Japan 🇯🇵", links: ["https://chat.whatsapp.com/CjY5jJkIiEU35F23Bx36Vd"] },
      { name: "South Korea 🇰🇷", links: ["https://chat.whatsapp.com/BnfFr636aBd3mqxzaQfGnM"] },
      { name: "Latin ⚽", links: ["https://chat.whatsapp.com/1qNIoBwJgXkGXL1oAK3JQc"] },
      { name: "Pakistan 🇵🇰", links: ["https://chat.whatsapp.com/IPIeH7VNKl3EpwQheFeGm6"] },
      { name: "Philippines 🇵🇭", links: ["https://chat.whatsapp.com/HdnxDGFGirTJ16eL7EkloM"] },
      { name: "Singapore 🇸🇬", links: ["https://chat.whatsapp.com/BEp5qQwD5jZ4xpNZ2Talud"] },
      { name: "Taiwan 🇹🇼", links: [{ url: "https://line.me/ti/g/JW9yObtc7E", label: "Join on LINE" }] },
      { name: "Thailand 🇹🇭", links: ["https://chat.whatsapp.com/BW7JUcAdLmrGdIaACQprop"] },
      { name: "USA 🇺🇸", links: ["https://chat.whatsapp.com/EK8UmXc9F752LdDbEOPMOb"] },
      { name: "Vietnam 🇻🇳", links: ["https://chat.whatsapp.com/FPHbeZcEvEeGSascTULZvM"] },
    ],
  },
  {
    id: "sports",
    title: "Sports: Teams, Clubs & Recreation",
    icon: "🏅",
    groups: [
      { name: "ES Eagles Sports Fans", links: ["https://chat.whatsapp.com/GAd76vp9IIJ8DXtU2G8lzl"] },
      { name: "MS Eagles Sports Fans", links: ["https://chat.whatsapp.com/Gna8xKA20C1BUsmUb9D8Iy?mode=gi_t"] },
      { name: "HS Eagles Sports Fans", links: ["https://chat.whatsapp.com/HpEO5IFChMZ9MwOiaMAZE4?mode=gi_t"] },
      { name: "Eagles Club Baseball ⚾", note: "For parents of Eagle Club Baseball players", links: ["https://chat.whatsapp.com/FmcMuIPoVG7BvRLKab79Mb"] },
      { name: "SAS Eagles Basketball 🏀 Fans", links: ["https://chat.whatsapp.com/BYTTKIY6r1mLcc3TvnYmp8"] },
      { name: "SAS Eagles Cricket 🏏 Club Fans", note: "Parents, faculty, community members & fans", links: ["https://chat.whatsapp.com/KorwYMlnSaNCw3Go4ZP8dc?mode=gi_t"] },
      { name: "SAS Golf ⛳️", note: "Fans of Eagles Club Golf and anyone keen to meet fellow golfers", links: ["https://chat.whatsapp.com/D7VNb49Q2Bw0qWmX08tody?s=cl&p=i&mlu=0&ilr=0"] },
      { name: "EAA Softball 🥎 Community", note: "For parents of EAA Softball players", links: ["https://chat.whatsapp.com/HdkIvVHLa8B9eZQR3mYtlc"] },
    ],
  },
  {
    id: "neighborhood",
    title: "Neighborhood Groups",
    icon: "📍",
    groups: [
      { name: "East Coast SAS Parents", links: ["https://chat.whatsapp.com/BQlTUZ53yH3Bk6q6JmzZR3"] },
      { name: "Hillview / Upper Bukit Timah / Dairy Farm / Bukit Batok", links: ["https://chat.whatsapp.com/JtBlAb4ja7x66hgVpQosBF"] },
      { name: "SAS Cairnhill & Around", links: ["https://chat.whatsapp.com/FeU8sJRdtyf04mv6yJljGS"] },
      { name: "SAS Parents Sentosa Group", links: ["https://chat.whatsapp.com/E4yerX1ZCl43uw5DSMPTZj"] },
      { name: "Holland Village / Jelita / Sixth Avenue / Bukit Timah & Surrounding", links: ["https://chat.whatsapp.com/H9krfhYjEj24yt0jgTZI6G"] },
      { name: "SAS Woodlands Community", links: ["https://chat.whatsapp.com/Huk8EVQPU9S6tYpKhtEThn"] },
      { name: "Woodlands / SAS Parents (Facebook)", links: ["https://www.facebook.com/groups/185756278204466/"] },
    ],
  },
];

// Infers a display kind (icon + default button label) from a link URL.
export function linkKind(url) {
  if (url.startsWith("mailto:")) return { icon: "✉️", label: "Email to join" };
  if (url.includes("chat.whatsapp.com")) return { icon: "💬", label: "Join on WhatsApp" };
  if (url.includes("facebook.com")) return { icon: "📘", label: "Facebook group" };
  if (url.includes("u.wechat.com") || url.includes("wechat")) return { icon: "💚", label: "Join on WeChat" };
  if (url.includes("line.me")) return { icon: "🟢", label: "Join on LINE" };
  if (url.includes("forms.gle") || url.includes("/forms/")) return { icon: "📝", label: "Join via form" };
  return { icon: "🔗", label: "Join" };
}
