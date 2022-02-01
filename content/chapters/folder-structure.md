# Project folder structure


## Problem
I've seen that, while working on apps, developers often forget to organize their project folder structure efficiently. By organizing I mean separating them based on their concern instead of their type. Generally we put similar files in a single root folder and I feel this can be improved. While this setup works for small projects with lesser number of files, it'll fall apart once the size of the project grows. Soon you'll forget the location of files and start guessing it. Even though we can search for a file quickly with `vscode command pallete`, maintaining an organized project folder structure will help finding files easier, make it look clean and also easier to maintain. 

## Separation by concern

When we say `separation by concern`, what do we mean ? It means to organise things by their scope and doing it recursively. Let me explain with an example. let's say we have an app where we have some pages. The user needs to see their profile and also a marketplace where products are listed. Generally what we tend to do is 
```bash
.
├─ pages
│  ├─ Profile.vue
│  └─ MarketPlace.vue
├─ components
│  ├─ ProfileAvatar.vue
|  |─ ..
│  └─ Product.vue
└─ root folders...
```
As you can see, we have a root folder where we have child folders for pages, components and more. The issue here is, it's harder to find a file once the count increases. It'll also make naming files a difficult task and the pain will continue to grow. So what can be a better approach ? We can separate the fearures/concerns to specific folders(Modules) and keep maintaining the same schema for children files and folders. e.g.

```bash
.
- User
  - components
  - composables
  - pages
  - providers
  - services
  - utils
  - ....
- Product
  - components
  - composables
  - pages
  - providers
  - services
  - utils
  - ....
```
So as we can see, we have two root folders which are `User` and `Product`. These are our features or concerns that are applicable from an application perspective. Inside we have folders for various concerns appplicable in a feature scope. We're also maintaining the same format across the project folder structure, so it's readable and easier to understand. This can be scaled infinitely by adding more `modules` or root folders which will contain all files concerning the particular feature. We can also have a `Shared` module which can house all the code that's shared between modules, such as `TypeScript` types, components, global state etc. 