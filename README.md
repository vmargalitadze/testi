#  Next.js  ის შუალედური დავალება

ეს არის Next.js-ის გამოყენებით აგებული მცირე ე-კომერციის ვებსაიტი, სადაც შეგიძლიათ ნახოთ პროდუქტები, პროფილი და კალათა. პროექტი აწყობილია `App Router` არქიტექტურით და იყენებს `FakeStore API`-ს.

## ტექნოლოგიები
- [Next.js 14+](https://nextjs.org)
- App Router და `src/` დირექტორია
- `fetch()` API-ს მოსაშენებლად
- `next/image` სურათების ოპტიმიზაციისთვის
- Tailwind CSS სტილიზაციისთვის (არასავალდებულო)
- GitHub-ზე ატვირთული ვერსიით და ხშირად ატვირთული კომიტებით

## როუთები

- `/products` - მთავარი გვერდი, ყველა პროდუქტი
- `/product/details/[id]` - კონკრეტული პროდუქტის დეტალები
- `/profile` - მომხმარებლის პროფილის გვერდი
- `/cart` - კალათის გვერდი

##  მონაცემთა ბაზები

- პროდუქტი: [https://fakestoreapi.com/products](https://fakestoreapi.com/products)
- პროფილი: [https://fakestoreapi.com/users/3](https://fakestoreapi.com/users/3)
- კალათა: [https://fakestoreapi.com/carts/1](https://fakestoreapi.com/carts/1)

##  ფუნქციონალი

- პროდუქტების ჩამონათვალი და დეტალური გვერდი
- პროფილის ჩვენება
- კალათის გვერდზე რაოდენობის კონტროლი (1-დან 10-მდე)
- სრული ნავიგაცია `NavBar`-ის საშუალებით
- პროექტში ასევე გამოყენებულია `layout.tsx` `NavBar` და `Footer` კომპონენტებით

##  ავტორიზაია (NextAuth.js)
პროექტი იყენებს NextAuth.js-ს სერვერზე მომხმარებლის რეგისტრაციისთვის და  ავტორიზაციისათვის. 

##  მონაცემთა ბაზა (Prisma + PostgreSQL + Neon)
პროექტი იყენებს Prisma ORM რეალური მონაცემების სამართავად. მონაცემთა ბაზა გამართულად მუშაობს [PostgreSQL]-ზე, რომელიც ჰოსტინგულია Neon-ზე. Prisma-ის მეშვეობით ხორციელდება სქემების მართვა და მონაცემების CRUD ოპერაციები (მაგ. პროდუქტის შენახვა, პროფილის მიღება და ა.შ.).

## კალათა (Cart) - Redux-ის გამოყენებით
პროექტში კალათის მენეჯმენტი განხორციელებულია React Redux-ით.
გამოყენებულია @reduxjs/toolkit და useSelector / useDispatch ჰუქები, რათა:

პროდუქტის დამატება კალათაში

რაოდენობის გაზრდა/შემცირება (min: 1, max: 10)

კალათის ელემენტების ჩვენება და მთლიანი ფასის დათვლა

საწყობში (store) აღწერილია კალათის სლაისი cartSlice.ts, რომელიც ინახავს:

cartItems: პროდუქტების სია რაოდენობით

totalPrice: მთლიანი ფასი სელექტორის მეშვეობით

## ბარათით გადახდა 
გაკეთებულია STRIPE ის დახმარებით 

## ინსტალაცია


```bash
npm install
npm run dev
