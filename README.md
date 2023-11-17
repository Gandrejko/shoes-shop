## Getting Started

To run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

# Technical stack

<ul>
    <li>main technology -- <b>Next.js</b></li>
    <li>requests -- <b>axios, React-query(v5)</b></li>
    <li>css -- <b>MUI</b></li>
    <li>authenification -- <b>next-auth</b></li>
    <li>working with forms -- <b>react-hook-form</b></li>
    <li>notifications -- <b>react-toastify</b></li>
</ul>

## Commits

every branch should contain action that discribe for what this branch is created (create, fix, update...)

## Deploy

we deployed our aplication on vercel [Shoes shop](https://shoes-shop-solvd.vercel.app/)

## Website structure

<ul>
  <li>main (/)</li>
  <li>/auth 
    <ul>
        <li>/sign-in (for logining)</li>
        <li>/sign-up (for registration)</li>
        <li>/forgot-password (for reseting password)</li>
        <li>/reset-password (for reseting password)</li>
    </ul>
  </li>
  <li>/products (all products)
    <ul>
        <li>/[productId] (chososen product)</li>
    </ul>
  </li>
  <li>/my-products (users products) <b>*Secure</b></li>
  <li>/add-product (page where user can create new product)  <b>*Secure</b></li>
  <li>/settings (user`s page where he/she can change his/her info)  <b>*Secure</b></li>
  <li>/cart (products cart)</li>
</ul>
