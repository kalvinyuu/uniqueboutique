## Unique Boutique

This is pyjama site was built for a family member which allows the shopper
to order customised pyjamas which is increadibly annoying to configure in
stripe!

Therefore we think this project is useful to have its source code available
and open to everyone...

## The Things We're Most Proud of

1. Using stripe metadata ta pass the users state, which contains the items
they ordered and those items colour, size and even the message they wish
to design on their pyjama top to the backend pretty much just the db. then
pass that back to the user and put the info in their cart so they can
validate before purchase. This had to be done through stripe webhooks 

2. The dashboard and its functionalities even though they are few it
allaws the admin to manage products and photos and orders


## Why this matters to us

They ultimately allow a smooth experience for the end user (the shopper),
and the user which we produced this site for the (the admin). We wish this be
almost modularised and modified to be used to produce stores for many
people and purposes.

## Roadmap

- [ ] write a useful git commit
- [ ] launch the site
- [ ] add functionalities such as p&p to strip prices for secondary things
like ribbons, messages etc.
- [ ] finish the design

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
