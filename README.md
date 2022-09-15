# RiteShop (Frontend)

**RiteShop** is an online store like Amazon, Jumia, Takealot etc. On **RiteShop**, purchases can either be made directly by customer online or via a sales agent through the a progressive web application. The key features of the app should be able to be accessed offline in case the sales agent has no mobile signal.

Both customers or sales agent can browse, filter and search through the product catalog to find items. They can then add items to their carts and the quantities of items in the cart can be updated. 

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).


![Riteshop](https://gitlab.com/deimosdev/internships/se/projects/mathilda-riteshop/riteshop-fe/uploads/07e433ea7e24c7824db6ac1dfb0cbc41/screencapture-localhost-3000-2022-09-15-19_58_54.png)
## App Features

### User authentication and authorisation (including Google login)

  On the backend, user authentication is handled with an email and password base login. On successful registration/login, a JWT token is generated and sent as a response for authentication. 

  Google Oauth is also used as a means of authentication for users with a Google account

### Payment Gateway

  Paypal is used as a payment system for orders. You can use a sandbox account to pay for orders on the site. Visit the paypal docs for a guide on how to [create a sandbox account](https://developer.paypal.com/developer/accounts).

  ![Order page](https://gitlab.com/deimosdev/internships/se/projects/mathilda-riteshop/riteshop-fe/uploads/9a21f4da4f03108edd8ed65c21323e2b/screencapture-localhost-3000-orders-6320e443ba127383c66089ac-2022-09-15-19_56_59.png)

### Admin Panel

  - The admin panel is used to handle all orders, products, users and role-requests.
  - An admin can mark an order as delivered
  - An admin can create a products for the site
  - An admin can approve or reject role requests

  ![All users page](https://gitlab.com/deimosdev/internships/se/projects/mathilda-riteshop/riteshop-fe/uploads/a7b94677e7177fa4ebb3a4484d2dee5e/screencapture-localhost-3000-users-all-2022-09-15-19_48_01.png)
  ![App products page](https://gitlab.com/deimosdev/internships/se/projects/mathilda-riteshop/riteshop-fe/uploads/68ecebea9f12a55bd4b8157a2a7584aa/screencapture-localhost-3000-products-all-2022-09-15-19_49_01.png)
  ![All orders page](https://gitlab.com/deimosdev/internships/se/projects/mathilda-riteshop/riteshop-fe/uploads/0599e74334ce55cb95a055a61bb57f1d/screencapture-localhost-3000-orders-all-2022-09-15-19_50_01.png)
  ![All role requests page](https://gitlab.com/deimosdev/internships/se/projects/mathilda-riteshop/riteshop-fe/uploads/24e8683f0261db354acbae0ba28305f5/screencapture-localhost-3000-requests-all-2022-09-15-19_50_53.png)
  ![Edit Product Page](https://gitlab.com/deimosdev/internships/se/projects/mathilda-riteshop/riteshop-fe/uploads/e313b451b726820bc00c2cf6a3aed80a/screencapture-localhost-3000-product-edit-632227d71bae43646ff55cb5-2022-09-15-19_54_08.png)
## Getting Started

To run this project on your local machine, do the following:

- Run `git clone https://gitlab.com/deimosdev/internships/se/projects/mathilda-riteshop/riteshop-fe.git` to clone this repo.
- Run `cd riteshop-fe/` to navigate into the project folder.
- Run `npm i` to install all the packages.
- Copy the contents of the `env.example` file and rename to `.env`. You can change the values to setup your own configuration.
- Run the development server `npm run dev`

The backend app of this project can be found [here](https://gitlab.com/deimosdev/internships/se/projects/mathilda-riteshop/riteshop-be).
