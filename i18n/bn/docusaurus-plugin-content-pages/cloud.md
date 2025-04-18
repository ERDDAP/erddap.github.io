---
title: "ERDDAP™ and the Cloud"
---
# ERDDAP™এবং উত ্ তাল সমুদ ্ রের ,

## মেঘ কী?

সহজ সংজ্ঞা স্থানীয় সার্ভার নয়। এটা খুবই বিস্তৃত আর এর মানে অনেক আলাদা সেট। উদাহরণস্বরূপ, এটি একটি ডাটা সেন্টার, ভার্চুয়াল প্রাইভেট সার্ভার, একটি শেয়ার সার্ভার, সার্ভার, সার্ভার, সার্ভারহীন অথবা অন্য কিছু হতে পারে।

### কেন ক্লাউড

অনেক কারণ রয়েছে, যেগুলো মেঘে চলে যেতে চায় । সবচেয়ে গুরুত্বপূর্ণ বিষয় হচ্ছে এটি যাচাই/অন্তর্বাসের জন্য সরবরাহ করে থাকে।

এর ফলে তথ্য সেন্টার/server রুম বজায় রাখার প্রয়োজন হবে। এ ছাড়া, এটি আপনার বর্তমান প্রয়োজনের মধ্যে পরিমাপ করা যায় । মেঘের মতো অনেক কিছু হতে পারে, যা আপনার সম্পদকে প্রভাবিত করতে পারে । এর মানে আরও অর্থ দিতে হবে (কম) অসহায় সম্পদ. এর মানে হতে পারে যে, একটি ব্যক্তিগত সার্ভারে শেয়ার সার্ভার চলমান। এর অর্থ হতে পারে আরও বড় বড় একটি শারীরিক সার্ভার উন্নীত করা।

## পারেERDDAP™মেঘে দৌড়াবো?

হ্যাঁ।

ERDDAP™এটা নকশা করা হয়েছে টমকের মধ্যে দিয়ে যেটা স্থানীয়ভাবে অথবা মেঘের পরিবেশে চালানো যায়। ডকার-এ পালিয়ে যাওয়ার জন্য সম্প্রদায়ের সমর্থন রয়েছে এবং সেখানে রয়েছে[অফিসিয়ালি ডকার সমর্থন শীঘ্রই আসছে](https://github.com/ERDDAP/erddap/blob/main/DOCKER.md). .

যে বলেন,ERDDAP™একটি সময় ডিজাইন করা হয় যখন নিবেদিত সার্ভার ছিল. এটা সার্ভার ছাড়া আর খুব কঠিন হবে না।

### পারেERDDAP™স্কেল?

মাপ নির্ধারণERDDAP™আরো অনেক সার্ভার বিহীন সম্পদ ব্যবহার করার চেয়ে জটিল। আমি নথিপত্রের উপর শ ্ রেষ ্ ঠত ্ ব দান করেছি ।[যেভাবে পরিমাপ করা হবেERDDAP™](https://erddap.github.io/docs/server-admin/scaling). . এটা পরিমাপ করা সহজ করাERDDAP™এমন কিছু যা আমরা আগ্রহী।

### কী কারণে স্বয়ংক্রিয়তাকে প্রতিরোধ করে?

ERDDAP™ডাটাসেটে পরিবর্তন, তথ্য বিনিময়, নিয়ন্ত্রণ করা, ব্যবহারকারীদের অনুরোধ এবং আরও অনেক কিছু জানানোসহ অনেক কিছু করা হচ্ছে। আর অনেক বড় প ্ রাসাদ &#33;ERDDAP™সার্ভারের মত[বিশ্ব নিরীক্ষা](https://coastwatch.pfeg.noaa.gov/erddap/index.html)- এর মানে হচ্ছে, এটা বারবার কিছু একটা করছে। সার্ভারহীন উপায়ের জন্য এটা খুবই ব্যয়বহুল একটি পরিস্থিতি। (সার্ভারহীন কাজ করার সময় আপনি একটি বড় প্রিমিয়াম খরচ করেন আর তাই প্রধান সুবিধা তখনই হয় যখন আপনি মাঝে মাঝে কল করেন) . . এছাড়াও, সব সরানো চেষ্টা করছেERDDAP™সার্ভারের অস্বীকৃত সংস্করণগুলোর ক্ষেত্রে বিভিন্ন কার্যকারিতা হ্রাস পাবে ।

### পারেERDDAP™মেঘ সংকলন ব্যবহার?

হ্যাঁ।

ERDDAP™অপসারণের সমর্থনের বৈশিষ্ট্য (যেমন AWS S3) এই সমর্থনের উন্নতি (যেমন উদাহরণ) গুরুত্বের মাত্রা বেশিERDDAP™উন্নয়ন সড়ক মানচিত্র।ERDDAP™অনেক বিদ্যমান অনলাইন সেবা থেকে তথ্য সংগ্রহে সক্ষম। আরও তথ্যের জন্য আমি পরামর্শ দিচ্ছি আমাদের মাধ্যমে[ধরন সংক্রান্ত তথ্য](https://erddap.github.io/docs/server-admin/datasets#detailed-descriptions-of-dataset-types). .
