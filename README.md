# Online Identity Mapping

Making a developer website for yourself takes a certain type of person. I am one of those that hate it, but I like the idea of having a centralized place for all my links. So, I made an Online Identity Mapping!

This simple website does exactly what it says on the tin, it takes all the profiles (or at least the ones I want to share) and links them to my name visually. I can then send one link, and know they have everything they need to slueth.

## How to make an Online Identity Mapping

### Setting it up

Its a very simple page, and so is making it. To start, simply [fork this repo](https://github.com/about14sheep/about14sheep.github.io) onto your machine. From there you can rename it whatever you want by running this in your terminal:
```
// replace <whatever> with what you want to call it.
mv about14sheep.github.io <whatever>
// example - rename this project to myproject
mv about14sheep.github.io myproject
```
Now you can go into your new project to do the rest with `cd myproject` replacing `myproject` with whatever you choose to name it.

Now, you don't want all my git history so you can remove it with:
```
rm -r .git
```
You will also want to remove my CNAME file, or updating it if you have your own domain:
```
rm CNAME
```
Now that you have a clean slate, lets get `git` back (you will need it later):
```
git init
```

### Adding your details

To keep it simple, I have added a template html file. This file is an exact copy of the `index.html` file, but has spaces for you to insert your details. What you are looking for is big `{ PUT YOUR _____ HERE }` where `_____` is a title or image path etc.. Don't forget to also remove the brackets `{ }`!

If you get stuck, you can peep into `index.html` to compare!

Once you have added all of your information delete my `index.html`:
```
rm index.html
```
Then rename the template file to `index.html`:
```
mv template.html index.html
```

For an example, to change the websites title you would look for this:
```
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="./main.css">
    <title>{PUT YOUR TITLE HERE}</title>
</head>
```

And if you wanted to change this to 'John Smith | Terminator' it would look like:
```
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="./main.css">
    <title>John Smith | Terminator</title> // remove the {brackets}!
</head>
```

### Images and path to images

You can download the image you want for your link, then save them into the `images` folder. From there the path becomes `./images/your-image.png`. An example being:
```
<img src="./images/stack-overflow.svg" width="48" height="48">
```

### Changing the pipe color
You can change the pipe accent color directly in the html. If you look for the `<p>` element where your name is you will see a `<span>` element:
```
<span style="color: gray; border-left: solid; border-color: #F47F24; padding-left: 5px;">{YOUR ONLINE HANDLE HERE}</span>
```
Change the `border-color` to whatever you like

### Make it yours
This is a simple html file with not a lot going on. Have fun with it, or keep it the way it is. Its up to you!

### Hosting your Online Identity Mapping
To host this site in all its glory I went the easy route. I turned it into a [github pages site](https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site#creating-your-site). This will be pretty simple from where your at now and that link should explain it pretty well.
