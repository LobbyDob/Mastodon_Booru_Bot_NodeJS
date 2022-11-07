# Mastodon_Booru_Bot_NodeJS
A bot that uploads pictures onto Mastodon. Images are fetched from Danbooru.donmai.us upon startup and after every hour.

# Prequisites
-NodeJS

-A Mastodon instance account for your bot

-Preferably some of kind of code editor like vscode

# Account Setup
After creating an account for your bot on your selected instance, go to Settings->Profile and tick the box annotated "This is a bot account"

![image](https://user-images.githubusercontent.com/117674960/200384007-f70170ed-9190-4211-90c6-c0a8615880a6.png)

Then proceed to Settings->Development and click the button annotated "New Application"

![Screenshot_2022-11-07_18-14-25](https://user-images.githubusercontent.com/117674960/200384474-b27708bb-c34a-4fa2-8b7e-04c545fdf981.jpg)

In the page that appears, set the name of your application and configure the permissions how you'd like:

![Screenshot_2022-11-07_18-15-52](https://user-images.githubusercontent.com/117674960/200384774-c152c374-1020-4207-8b5d-baf3df3e0c73.jpg)
![Screenshot_2022-11-07_18-16-54](https://user-images.githubusercontent.com/117674960/200384895-39192738-fd20-4412-94d4-7b927075931b.jpg)

The application website and Redirect url parameters can be left at their defaults. This bot requires only read and write permissions.
After configuration click on the submit button, then click on the name of your application in the Applications page.

![Screenshot_2022-11-07_18-20-46](https://user-images.githubusercontent.com/117674960/200385880-55b45f0e-0217-4dc0-a8de-86980159b838.jpg)

On the application settings page, make a note of the client key, client secret and access token values, as these will be needed for your bot.

# Application setup
First, install the following packages by entering the following commands in your project directory:

```
npm install mastodon-api

npm install danbooru
```

Create a file in the project directory titled .env, using key value pairs for the CLIENT_KEY, CLIENT_SECRET, ACCESS_TOKEN and API_URL keys.
A template is available in .env_sample:

![Screenshot_2022-11-07_19-15-21](https://user-images.githubusercontent.com/117674960/200395453-abbacdc3-150a-4b92-a1cf-ce42ded6b9c0.jpg)

In the bot.js file, add whichever tags you want the bot to search in the tags parameter for booru.posts() on line 28:

![Screenshot_2022-11-07_19-18-37](https://user-images.githubusercontent.com/117674960/200395831-2bebd4a6-00f0-421c-bba3-2645a5d930f6.jpg)

Once the application is configured to your liking, run the bot by entering the following command in your project directory:

```
node bot.js
```
