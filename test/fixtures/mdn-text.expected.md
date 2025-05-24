## Page: https://developer.mozilla.org/en-US/docs/Learn_web_development/Getting_started/Your_first_website

## Your first website

*   Previous
*   Overview: Getting started modules
*   Next

This module introduces you to the practicalities of web development. You'll gather the assets and write the code to construct a simple webpage, then publish it for the world to see.

It's a lot of work to create a professional website, so if you're new to web development, we encourage you to start small. You won't build another Facebook right away, but it's not hard to make your own simple website online, so we'll start there.

## Prerequisites

This module assumes no prior knowledge of web technologies, but you should already be comfortable with using your operating system, including using the file system and browsing the web. You should have a code editor and multiple web browsers installed.

If this is not the case, we'd suggest that you run through the Environment setup module first.

## Tutorials

What will your website look like?

Before you start writing the code for your website, you should plan it first. What information are you showcasing? What fonts and colors are you using? Here we'll outline a simple method that you can follow to plan out your site's content and design.

Creating the content

HTML (**H**yper**T**ext **M**arkup **L**anguage) is the code that is used to structure a web page and its content. For example, content could be structured within a set of paragraphs, a list of bulleted points, or using images and data tables. This article provides a basic understanding of HTML and its functions, and shows you how to create the basic content for your first website.

Styling the content

CSS (Cascading Style Sheets) is the code that styles web content. _Styling the content_ walks through what you need to get started. We'll answer questions like: How do I make text red? How do I make content display at a certain location in the (webpage) layout? How do I decorate my webpage with background images and colors?

Adding interactivity

JavaScript is a programming language that adds interactivity to websites. This happens in games, in the behavior of responses when buttons are pressed or with data entry on forms, with dynamic styling, with animation, etc. This article helps you get started with JavaScript and furthers your understanding of what is possible.

Publishing your website

Once you finish writing the code and organizing the files that make up your website, you need to put it all online so people can find it. This article explains how to get your sample website online with little effort.

*   Previous
*   Overview: Getting started modules
*   Next

## See also

The Frontend Developer Career Path _MDN learning partner_

Scrimba's _Frontend Developer Career Path_ teaches all you need to know to be a competent front-end web developer, with fun interactive lessons and challenges, knowledgeable teachers, and a supportive community. Go from zero to landing your first front-end job! Many of the course components are available as standalone free versions.

---

## Page: https://developer.mozilla.org/en-US/docs/Learn_web_development/Getting_started/Your_first_website/What_will_your_website_look_like

## What will your website look like?

*   Overview: Your first website
*   Next

_What will your website look like?_ discusses the planning and design work you have to do for your website before writing code, including "What information does my website offer?", "What fonts and colors do I want?", and "What does my site do?"

<table><tbody><tr><th scope="row">Prerequisites:</th><td>Basic familiarity with your computer operating system, the basic software you will use to build a website, and file systems.</td></tr><tr><th scope="row">Learning outcomes:</th><td><ul><li>Plan a basic website.</li><li>Use a basic design process.</li><li>Gather assets.</li></ul></td></tr></tbody></table>

## First things first: planning

Before doing anything, you need some ideas. What should your website actually do? A website can do basically anything, but, for your first try, you should keep things simple. We'll start by creating a simple webpage with a heading, an image, and a few paragraphs.

To begin, you'll need to answer these questions:

1.  **What is your website about?** Do you like dogs, New York, or Pac-Man?
2.  **What information are you presenting on the subject?** Write a title and a few paragraphs and think of an image you'd like to show on your page.
3.  **What does your website look like,** in simple high-level terms? What's the background color? What kind of font is appropriate: formal, cartoony, bold and loud, subtle?

**Note:** Complex projects need detailed guidelines that go into all the details of colors, fonts, spacing between items on a page, appropriate writing style, and so on. This is sometimes called a design guide, design system, or brand book, and you can see an example at the Firefox Acorn Design System.

## Sketching out your design

Next, grab pen and paper and sketch out roughly how you want your site to look. For your first simple webpage, there's not much to sketch out, but you should get in the habit of doing this now. It really helps — you don't have to be Van Gogh!

![A rough drawing and sketch of a website on paper](https://developer.mozilla.org/en-US/docs/Learn_web_development/Getting_started/Your_first_website/What_will_your_website_look_like/website-drawing-scan.png)

**Note:** Even on real, complex websites, the design teams usually start out with rough sketches on paper and later on build digital mockups using a graphics editor or web technologies.

Web teams often include both a graphic designer and a user experience (UX) designer. Graphic designers put together the visuals of the website. UX designers have a somewhat more abstract role in addressing how users will experience and interact with the website.

At this point, it's good to start putting together the content that will eventually appear on your webpage. You should still have your paragraphs and title from earlier. Keep these close by.

## Choosing a theme color

To choose a color, go to the Color Picker and find a color you like. When you click on a color, you'll see a strange six-character code like `#660066`. That's called a _hex code_ (short for hexadecimal), and represents your color. Copy the code down somewhere safe for now.

![Color-Picker-Tool on MDN Docs website with RGB, HSL, and HEX colors ](https://developer.mozilla.org/en-US/docs/Learn_web_development/Getting_started/Your_first_website/What_will_your_website_look_like/color-picker.png)

## Choosing an image

To choose an image, go to Google Images and search for something suitable.

1.  When you find the image you want, click on the image to get an enlarged view of it.
2.  Right-click the image (Ctrl + click on a Mac), choose _Save Image As…_, and choose a safe place to save your image.

![Search results for a search term on Google Images](https://developer.mozilla.org/en-US/docs/Learn_web_development/Getting_started/Your_first_website/What_will_your_website_look_like/updated-google-images.png)

Note that most images on the web, including in Google Images, are copyrighted. To reduce your likelihood of violating copyright, you can use Google's license filter. Click on the _Tools_ button, then on the resulting _Usage rights_ option that appears below. You should choose the option _Creative Commons licenses_.

![Filtered search results to get images of Creative Commons Licenses on Google Images](https://developer.mozilla.org/en-US/docs/Learn_web_development/Getting_started/Your_first_website/What_will_your_website_look_like/updated-google-images-licensing.png)

## Choosing a font

There is a set of fonts called the web safe fonts — such as Arial, Times New Roman, or Courier New — that are generally available on most computer systems. If you use one of these fonts on your website, the browser will load the font file available on the user's computer.

However, if you want to use other fonts not generally available on devices, you need to either include them along with your website files or reference the font files from a third-party font service so the browser can download them as needed. Google Fonts is one such service that provides access to many fonts.

Let's use Google fonts to choose a font for your website:

1.  Go to Google Fonts.
2.  Scroll down the list of fonts until you find one you like. If you are having trouble finding one, you can use the filters available in the other column to narrow down your search.
3.  Click your font option, then on the next page click the "Get font" button.
4.  On the next page, click "Get embed code".
5.  Copy both of the provided code blocks, and save them somewhere safe for later use.

**Note:** As with images, many fonts are protected by licenses, meaning you cannot necessarily use them freely on commercial websites. You will be fine for now while working on learning examples, but keep this in mind when choosing fonts for real websites.

*   Overview: Your first website
*   Next

---

## Page: https://developer.mozilla.org/en-US/docs/Learn_web_development/Getting_started/Your_first_website/Creating_the_content

## HTML: Creating the content

*   Previous
*   Overview: Your first website
*   Next

HTML (**H**yper**T**ext **M**arkup **L**anguage) is the code that is used to structure a web page and its content. This article provides a basic understanding of HTML and its functionality, and shows you how to create the basic content for your first website.

<table><tbody><tr><th scope="row">Prerequisites:</th><td>Basic familiarity with your computer operating system, the basic software you will use to build a website, and file systems.</td></tr><tr><th scope="row">Learning outcomes:</th><td><ul><li>The purpose and function of HTML.</li><li>The basic parts of HTML syntax — opening and closing tags, elements, attributes, head, body.</li><li>Common HTML elements including paragraphs, headings, images, lists, and links.</li></ul></td></tr></tbody></table>

## So what is HTML?

HTML is a _markup language_ consisting of a series of **elements** used to wrap (or enclose) text content to define its structure and cause it to behave in a certain way.

Let's look at an example — the following content will all be shown on the same line when displayed on a web page, as it is not structured in any way:

Instructions for life: Eat Sleep Repeat 

If we wrap this content with the following HTML elements, we can turn that single line into a paragraph (`<p>`) and three bullet points (`<li>`):

html

    <p>Instructions for life:</p> <ul> <li>Eat</li> <li>Sleep</li> <li>Repeat</li> </ul> 

This HTML will render as follows in a web browser:

Instructions for life:

*   Eat
*   Sleep
*   Repeat

As well as structuring text, HTML has many other uses — making text or images link to other web pages, embedding images or videos, creating data tables, and so on.

## Creating your first HTML document

Let's see how individual elements are combined to form an HTML page. In this section, you'll create a basic HTML file and take a look at what it's made up of.

1.  Inside your `web-projects` folder, create another new folder called `first-website`.
2.  Inside `first-website`, create a new file called `index.html`, and insert the following code into the file exactly as shown:

html

    <!doctype html> <html lang="en-US"> <head> <meta charset="utf-8" /> <meta name="viewport" content="width=device-width" /> <title>My test page</title> </head> <body> <img src="" alt="My test image" /> </body> </html> 

Here, we have the following:

*   `<!doctype html>`: The doctype is a required preamble. In the mists of time, when HTML was young (around 1991/92), doctypes were meant to act as links to a set of rules that the HTML page had to follow to be considered good HTML, which could mean automatic error checking and other useful things. However, these days, they don't do much and are basically just needed to make sure your document behaves correctly. That's all you need to know for now.
*   `<html></html>`: The `<html>` element wraps all the content on the entire page and is sometimes known as the **root element**. It also includes the `lang` attribute, which sets the primary language of the document.
*   `<head></head>`: The `<head>` element acts as a container for all the stuff you want to include on the HTML page that _isn't_ the content you are showing to your page's viewers. This includes things like keywords and a page description that you want to appear in search results, CSS to style the content, character set declarations, and more.
*   `<meta charset="utf-8">`: This element sets the character set your document should use to UTF-8, which includes most characters from the vast majority of written languages. Essentially, it can now handle any textual content you might put on it. There is no reason not to set this, and it can help avoid some problems later on.
*   `<meta name="viewport" content="width=device-width">`: This viewport element ensures the page renders at the width of the browser viewport, preventing mobile browsers from rendering pages wider than the viewport and then shrinking them down.
*   `<title></title>`: The `<title>` element sets the title of your page, which is the title that appears in the browser tab the page is loaded in. It is also used to describe the page when you bookmark/favorite it.
*   `<body></body>`: The `<body>` element contains _all_ the content that you want to show to web users when they visit your page, whether that's text, images, videos, games, playable audio tracks, or whatever else. At the moment it only contains a single `<img>` element, but we'll add more content later on.

**Note:** Most HTML elements consist of an **opening tag** (for example, `<body>`), followed by the element's content, followed by a **closing tag** (for example, `</body>`). Some HTML elements also have **attributes**, which contain extra settings or information about the element — see for example `charset`, `name`, and `src` in the our code sample.

## Embedding images

Let's turn our attention to the `<img>` element:

html

    <img src="" alt="My test image" /> 

This embeds an image into our page in the position it appears. It does this via the `src` (source) attribute, which contains the path to the image file we want to embed.

We have also included an `alt` (alternative) attribute. In the `alt` attribute, you specify descriptive text for users who cannot see the image, possibly because of the following reasons:

1.  They are visually impaired. Users with significant visual impairments often use tools called screen readers to read out the alt text to them.
    
2.  Something has gone wrong, causing the image not to display. If the `src` attribute does not contain a valid path to an image, the alt text will be displayed instead:
    
    ![The words: my test image](https://developer.mozilla.org/en-US/docs/Learn_web_development/Getting_started/Your_first_website/Creating_the_content/alt-text-example.png)
    

The alt text you write should provide the reader with enough information to have a good idea of what the image conveys. In this example, our current text of "My test image" is not good because it doesn't convey descriptive information about the image. A much better alternative for our Firefox logo would be "The Firefox logo: a flaming fox surrounding the Earth."

**Note:** Elements such as `<img>` have no content or closing tag, and are therefore called **empty** (or **void**) elements. They are sometimes written with a **trailing slash** at the end of their single tag (`<img />`), but this is optional.

Let's get your image displaying now.

1.  Inside the `first-website` folder, create a new folder called `images`, and put the image you chose in the previous example inside this folder.
2.  Inside the `<img>` tag's `src` attribute value, enter the path to your image. It is inside a folder called `images`, which is inside the same directory as your `index.html` file, therefore the path will be `images/` plus the name of your image. For example, if your image was called `firefox-icon.png`, your `src` attribute would look like this: `src="images/firefox-icon.png"`.
3.  Replace the `alt` attribute value — `My test image` — with some text that better describes your image.
4.  Open your `index.html` file inside a web browser. You should see your image displayed. If not, check your `<img>` element against our code; make sure it is not missing any of the syntax, such as the quote marks. Make sure the image filename is correct.

If the image is really large and therefore doesn't fit on the screen, don't worry about it. We'll fix this issue in the next article.

## Marking up text

This section will cover some essential HTML elements you'll use for marking up text.

**Note:** Scrimba's The basics of semantic HTML _MDN learning partner_ is an interactive lesson providing a useful description of HTML, with particular emphasis on why the _semantic_ aspect of it is important.

### Headings

Heading elements allow you to specify that certain parts of your content are headings — or subheadings. In the same way that a book has the main title, chapter titles, and subtitles, an HTML document can too. HTML contains 6 heading levels, <h1>–<h6>, although you'll commonly only use 3 to 4 at most:

html

    <!-- 4 heading levels: --> <h1>My main title</h1> <h2>My top level heading</h2> <h3>My subheading</h3> <h4>My sub-subheading</h4> 

**Note:** Anything in HTML between `<!--` and `-->` is an **HTML comment**. The browser ignores comments as it renders the code. In other words, they are not visible on the page — just in the code. HTML comments are a way for you to add notes about your code or logic, which might be useful to others working on the same code, or you, if you came back to it after 6 months and can't remember what you did.

Now try adding a suitable main title to your HTML page just above your `<img>` element. Save the file and view it in a browser to see the effect.

### Paragraphs

Paragraph `<p>` elements are for containing paragraphs of text; you'll use these frequently when marking up regular text content:

html

    <p>This is a single paragraph</p> 

Add your sample text from the previous article into one or a few paragraphs, placed directly below your `<img>` element. Save it and look at your page in a browser.

### Lists

A lot of the web's content is lists and HTML has special elements for these. Marking up lists always consists of at least 2 elements. The most common list types are ordered and unordered lists:

1.  **Unordered lists** are for lists where the order of the items doesn't matter, such as a shopping list. These are wrapped in a `<ul>` element.
2.  **Ordered lists** are for lists where the order of the items does matter, such as a list of cooking instructions in a recipe. These are wrapped in an `<ol>` element.

Each item inside the lists is put inside an `<li>` (list item) element.

For example, if we wanted to turn part of the following paragraph fragment into a list:

html

    <p> At Mozilla, we're a global community of technologists, thinkers, and builders working together… </p> 

We could modify the markup to this:

html

    <p>At Mozilla, we're a global community of</p> <ul> <li>technologists</li> <li>thinkers</li> <li>builders</li> </ul> <p>working together…</p> 

Try adding an ordered or unordered list to your example page, and view the result in a browser.

## Creating links

Links are very important — they are what makes the web a web! To add a link, we need to use an `<a>` element, "a" being short for "anchor". To make text within your paragraph into a link, follow these steps:

1.  Choose some text. We chose the text "Mozilla Manifesto".
    
2.  Wrap the text in an `<a>` element, as shown below:
    
    html
    
        <a>Mozilla Manifesto</a> 
    
3.  Give the `<a>` element an `href` attribute, as shown below:
    
    html
    
        <a href="">Mozilla Manifesto</a> 
    
4.  Fill in the value of this attribute with the web address that you want the link to point to:
    
    html
    
        <a href="https://www.mozilla.org/en-US/about/manifesto/"> Mozilla Manifesto </a> 
    

You might get unexpected results if you omit the `https://` or `http://` part, called the _protocol_, at the beginning of the web address. After making a link, click it to make sure it is sending you where you wanted it to.

**Note:** `href` might appear like a rather obscure choice for an attribute name at first. It stands for _**h**ypertext **ref**erence_.

Add a link to your page now, if you haven't already done so.

## Conclusion

If you have followed all the instructions in this article, you should end up with a page that looks like the one below (you can also view it here):

![A web page screenshot showing a Firefox logo, a heading saying Mozilla is cool, and two paragraphs of filler text](https://developer.mozilla.org/en-US/docs/Learn_web_development/Getting_started/Your_first_website/Creating_the_content/finished-test-page-small.png)

If you get stuck, you can always compare your work with our finished example code on GitHub.

Here, we have only really scratched the surface of HTML. You'll learn a lot more in our Structuring content with HTML Core module later on in the course.

## See also

---

## Page: https://developer.mozilla.org/en-US/docs/Learn_web_development/Getting_started/Your_first_website/Styling_the_content

## CSS: Styling the content

*   Previous
*   Overview: Your first website
*   Next

CSS (Cascading Style Sheets) is the code that styles web content. This article walks you through a basic understanding of CSS — how it works and how to improve the look and feel of the content structure you created in the previous article.

<table><tbody><tr><th scope="row">Prerequisites:</th><td>Basic familiarity with your computer operating system, the basic software you will use to build a website, and file systems.</td></tr><tr><th scope="row">Learning outcomes:</th><td><ul><li>The purpose and function of CSS.</li><li>The basic parts of CSS syntax — rulesets, selectors, declarations, properties, property values.</li><li>Common CSS functionality including box model, changing colors and fonts, and positioning HTML elements.</li></ul></td></tr></tbody></table>

## What is CSS?

Like HTML, CSS is not a programming language. It's not a markup language either. **CSS is a style sheet language.** CSS is used to style HTML elements: you select the elements you want to style and set values for their style properties, which define how they will look.

Let's revisit the basic HTML example from the article Creating the content:

html

    <p>Instructions for life:</p> <ul> <li>Eat</li> <li>Sleep</li> <li>Repeat</li> </ul> 

This renders as follows on its own:

Instructions for life:

*   Eat
*   Sleep
*   Repeat

If we add some CSS into the mix, we can change how the HTML looks. The following snippet selects the `<p>` element and gives it a different font and a red text `color`. It then selects all the `<li>` elements and gives each one a greeny-yellow `background-color`, a 1-pixel solid black `border`, and a 5-pixel bottom margin:

css

    p { font-family: sans-serif; color: red; } li { background-color: greenyellow; border: 1px solid black; margin-bottom: 5px; } 

With the CSS applied to the HTML, the demo now renders like this:

Instructions for life:

*   Eat
*   Sleep
*   Repeat

As you can see, with just a little CSS, we were able to change the appearance of a plain-looking list.

CSS has many other functions, from specifying background images and gradients, to controlling typography and scrolling behavior, to adding animations and building entire web page layouts.

## Applying CSS to your HTML

When using CSS, the first thing to get right is to make sure that your CSS is successfully applied to your HTML. In this section, we'll add a CSS **stylesheet** to your `first-website` and apply it to your page.

1.  Inside your `first-website` folder, create another new folder called `styles`.
    
2.  Using a text editor, paste the following CSS into a new file, which will give your `<p>` elements a red text color. It's useful to start with something like this to test whether your stylesheet is being applied to your HTML correctly.
    
    css
    
        p { color: red; } 
    
3.  Save the file in the `styles` folder with the filename `style.css`.
    
4.  Open your `index.html` file. Paste the following line inside the HTML head (between the `<head>` and `</head>` tags):
    
    html
    
        <link href="styles/style.css" rel="stylesheet" /> 
    
5.  Save `index.html` and load it in your browser. You should see something like this:
    

![A Mozilla logo and some paragraphs. The paragraph text has been styled red by our css.](https://developer.mozilla.org/en-US/docs/Learn_web_development/Getting_started/Your_first_website/Styling_the_content/website-screenshot-styled.png)

If your paragraph text is red, congratulations! Your CSS is working. If not, go through the above steps and check carefully that you have followed each one correctly.

## CSS syntax basics

In the previous CSS example, `p` is called a **selector** — it selects the element(s) to style. In particular, `p` selects all the paragraphs in the HTML. The line inside the curly braces (`{ }`) is called a **declaration** – it sets a value for a specific property. In this case, the **property** is `color`, which controls the text color of the paragraphs, and the **property value** set is `red`.

The whole structure is called a **ruleset**. (The term _ruleset_ is often referred to as just _rule_.)

Let's look at another ruleset, this time with multiple declarations:

css

    p { color: red; width: 500px; border: 1px solid black; } 

Within a ruleset, you must use a semicolon (`;`) to separate one declaration from the next. Within each declaration, you must use a colon (`:`) to separate the property and its value.

You can also include multiple selectors in one rule, separated by commas, to select multiple elements. For example:

css

    p, .my-class, #my-id { color: red; } 

In this CSS rule, we've included an **element** (or **type**) selector, which selects a specific HTML element. We've also included two other selector types, which aren't relevant to the rest of this tutorial. If you're curious about what they do, check out our Basic selectors guide.

## Improving the text

Let's return to our example and use CSS to improve the appearance of the text. We'll set a new font for the page and change some text settings for different elements.

1.  First, find the output from Google Fonts that you previously saved. If you've not already chosen a font, follow the link and do it now.
    
2.  Add the `<link>` elements inside your `index.html`'s `<head>`, just before the closing `</head>` tag. They should look something like this:
    
    html
    
        <link rel="preconnect" href="https://fonts.googleapis.com" /> <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin /> <link href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet" /> 
    
    This code links your page to a stylesheet hosted by the Google Fonts service, which loads your chosen font.
    
3.  Next, go to your `style.css` file and delete the existing rule. We no longer want our paragraphs to be red.
    
4.  Add the following lines to `style.css`:
    
    css
    
        html { /* px means "pixels". The base font size is now 10 pixels high */ font-size: 10px; /* Replace PLACEHOLDER with the font-family property value you got from Google Fonts */ font-family: PLACEHOLDER; } 
    
    **Note:** Anything in CSS between `/*` and `*/` is a **CSS comment**, which is ignored by the browser. CSS comments are a way for you to include helpful notes about your code or logic, without affecting how your webpage is rendered.
    
5.  Replace the `font-family` placeholder line with the `font-family` line from your Google Fonts code, for example:
    
    css
    
        font-family: "Roboto", sans-serif; 
    
    The `font-family` property sets the font(s) you want to apply to your HTML. This rule defines a global base font and font size for the whole page. All elements inside the `<html>` element will inherit the same `font-size` and `font-family`.
    
6.  Now let's set some font and text styles on our `<h1>`, `<li>`, and `<p>` elements. We'll set new `font-size` values for each element. We'll also center the heading using `text-align` and increase the `line-height` and `letter-spacing` of the paragraphs and list items to make the body content more readable.
    
    css
    
        h1 { font-size: 60px; text-align: center; } p, li { font-size: 16px; line-height: 2; letter-spacing: 1px; } 
    
7.  Save your code and load your HTML in a browser (refresh it if you've got it open from before). Your work-in-progress should look similar to this:
    
    ![A Mozilla logo and some paragraphs. A sans-serif font has been set, the font sizes, line height and letter spacing are adjusted, and the main page heading has been centered](https://developer.mozilla.org/en-US/docs/Learn_web_development/Getting_started/Your_first_website/Styling_the_content/website-screenshot-font-small.png)
    
    **Note:** Try adjusting the `px` values until you end up with font sizes that you like for your heading and body text.
    

## CSS is all about boxes

Something you'll notice about CSS as you use it more is that a lot of it is about boxes. Most HTML elements on a page can be thought of as boxes that sit on top of (or alongside) other boxes. You can set values on these boxes for size, color, positioning, etc. This is referred to as **the box model**.

![Three boxes sat inside one another. From outside to in they are labelled margin, border and padding](https://developer.mozilla.org/en-US/docs/Learn_web_development/Getting_started/Your_first_website/Styling_the_content/box-model.png)

Each box that takes up space on your page has properties like:

*   `padding`: The space around the content. In the previous example, it is the space around the paragraph text.
*   `border`: The solid line just outside the padding.
*   `margin`: The space outside the border.

In this section, we also use the following properties, some of which you've seen before:

*   `width`: The width of an element.
*   `background-color`: The color behind an element's content and padding.
*   `color`: The color of an element's content (usually text).
*   `text-shadow`: A drop shadow on the text inside an element.
*   `display`: The display mode of an element (which basically refers to how it appears or is laid out on the web page).

In each of the sections that follow:

1.  Add the provided CSS code to the bottom of your `style.css` file.
2.  Save the file and refresh your browser to see how the CSS has affected the HTML rendering.
3.  Read the provided explanation to help you understand how the CSS works.
4.  If you are feeling adventurous, experiment with changing the property values to further customize your page.

## Changing the page color

css

    html { background-color: #00539f; } 

This rule sets a background color for the entire page. Change the color code to the color you chose in What will your website look like?.

## Styling the body

css

    body { width: 600px; margin: 0 auto; background-color: #ff9500; padding: 0 20px 20px 20px; border: 5px solid black; } 

The above code sets new values for several properties of the `<body>` element. Let's go through these line-by-line:

*   `width: 600px;`: This forces the body to always be 600 pixels wide.
*   `margin: 0 auto;`: When you set two values on a property like `margin` or `padding`, the first value affects the element's top _and_ bottom side (setting it to `0` in this case); the second value affects the left _and_ right side. `auto` is a special value that divides the available horizontal space evenly between left and right.
*   `background-color: #FF9500;`: This sets the element's background color. Our project uses a reddish orange for the `<body>` background color to contrast with the dark blue used for the `<html>` element.
*   `padding: 0 20px 20px 20px;`: This sets four values for padding. The goal is to put some space around the content. In this example, there is no padding on the top of the body, and 20 pixels on the right, bottom, and left. The values set top, right, bottom, and left padding, in that order.
*   `border: 5px solid black;`: This sets values for the width, style, and color of the border. In this case, it's a 5-pixel-wide solid black border around all sides of the body.

## Positioning and styling the main page title

css

    h1 { margin: 0; padding: 20px 0; color: #00539f; text-shadow: 3px 3px 1px black; } 

You may have noticed a horrible gap at the top of the body. That happens because browsers apply default styling to the `<h1>` element. That might seem like a bad idea, but the intent is to provide basic readability for unstyled pages. To eliminate the gap, we overwrite the browser's default styling with the setting `margin: 0;`.

Next, we set the heading's top and bottom padding to 20 pixels, and set the heading text to be the same color as the HTML background color.

Finally, `text-shadow` applies a shadow to the text content of the element:

*   The first pixel value sets the **horizontal offset** of the shadow from the text: how far it moves across.
*   The second pixel value sets the **vertical offset** of the shadow from the text: how far it moves down.
*   The third pixel value sets the **blur radius** of the shadow. A larger value produces a more fuzzy-looking shadow.
*   The fourth value sets the base color of the shadow.

## Centering the image

css

    img { display: block; margin: 0 auto; max-width: 100%; } 

Next, we center the image to make it look better. We can use the same `margin: 0 auto` trick as we did for the body, but there are differences that require an additional setting to make the CSS work.

The `<body>` element is a **block** element, meaning it takes up space on the page and can accept margin, padding, and other box properties. `<img>` (image) elements, on the other hand, are **inline** elements: by default, they don't accept margin values in the same way block elements do. For the auto-margin trick to work on this image, we must give it block-level behavior by using `display: block;`.

Finally, we set the `max-width` property to `100%` to ensure that if the image is larger than the `width` set on the body (600 pixels), it will be constrained to `600px` and won't stretch wider.

**Note:** Don't be too concerned if you don't completely understand `display: block;` and the differences between a block element and an inline element, or `max-width: 100%;`. They will make more sense as you continue your study of CSS.

## Conclusion

If you followed all the instructions in this article, you should have a page that looks similar to this one:

![A Mozilla logo, centered, and a header and paragraphs. It now looks nicely styled, with a blue background for the whole page and orange background for the centered main content strip.](https://developer.mozilla.org/en-US/docs/Learn_web_development/Getting_started/Your_first_website/Styling_the_content/website-screenshot-final.png)

You can view our version here. If you get stuck, you can always compare your work with our finished example code on GitHub.

In this article, we've only scratched the surface of CSS. You'll learn a lot more in our CSS styling basics Core module later in the course.

## See also

---

## Page: https://developer.mozilla.org/en-US/docs/Learn_web_development/Getting_started/Your_first_website/Adding_interactivity

## JavaScript: Adding interactivity

*   Previous
*   Overview: Your first website
*   Next

JavaScript is a programming language that adds interactivity to websites. You can use it to control just about anything — form data validation, button functionality, game logic, dynamic styling, animation updates, and much more. This article gets you started with JavaScript and walks you through adding some fun features to your first website.

<table><tbody><tr><th scope="row">Prerequisites:</th><td>Basic familiarity with your computer operating system, the basic software you will use to build a website, and file systems.</td></tr><tr><th scope="row">Learning outcomes:</th><td><ul><li>The purpose and function of JavaScript.</li><li>A basic understanding of JavaScript language fundamentals such as variables, operators, conditionals, functions, and events.</li></ul></td></tr></tbody></table>

## What is JavaScript?

JavaScript is a full-fledged programming language — it contains all the classic programming features you may have seen in other programming languages (or at least heard about), such as **variables**, **loops**, and **functions**.

JavaScript, when used on web pages (though it can also be used in other places), generally works by:

*   Getting references to one or more values such as numbers or to elements on the page.
*   Doing something with those values, such as adding the numbers together.
*   Returning a result that can be used to do something else later on. For example, you might want to display the sum of those numbers on the page.

Let's look at an example. We'll use the same basic list we saw in the last couple of articles:

html

    <p>Instructions for life:</p> <ul> <li>Eat</li> <li>Sleep</li> <li>Repeat</li> </ul> 

We'll also define a CSS class called `.done` that will style any element it's applied to, making it look like a completed task with green text color and a strikethrough. We'll apply it to our `<li>` elements using JavaScript in the next step.

css

    .done { color: darkseagreen; text-decoration: line-through solid black 2px; } 

Now on to the JavaScript. Here, we first store references to the `<li>` elements inside a variable called `listItems`. We then define a function called `toggleDone()` that adds the `done` class to a list item if it doesn't already have it, and removes the class if it does. Finally, we loop through the list items (using `forEach()`) and add an event listener (using `addEventListener()`) to each list item so that when it is clicked, the `done` class is toggled, applying the CSS we defined earlier.

js

    const listItems = document.querySelectorAll("li"); function toggleDone(e) { if (!e.target.className) { e.target.className = "done"; } else { e.target.className = ""; } } listItems.forEach((item) => { item.addEventListener("click", toggleDone); }); 

Don't worry if you don't understand the above JavaScript now. Getting comfortable with JavaScript is more challenging than getting comfortable with HTML and CSS, but things will become clearer later on in the course.

This example will render as follows in a web browser:

Instructions for life:

*   Eat
*   Sleep
*   Repeat

Try clicking the list items a few times and note how the "done" styles are toggled on and off as a result. Not that bad for 11 lines of JavaScript.

## A "Hello world!" walkthrough

To start you off with writing some JavaScript, we'll walk you through adding a _Hello world!_ example to your sample website. (_Hello world!_ is the standard introductory programming example.)

**Warning:** If you haven't been following along with the rest of our course, download this example code and use it as a starting point.

1.  Inside your `first-website` folder or the example folder you have just downloaded, create a new folder named `scripts`.
    
2.  Within the `scripts` folder, create a new text document called `main.js`, and save it.
    
3.  Go to your `index.html` file and enter this code on a new line, just before the closing `</head>` tag:
    
    html
    
        <script async src="scripts/main.js"></script> 
    
    This does the same job as the `<link>` element for CSS – it applies the JavaScript to the page so it can affect the HTML (along with the CSS and anything else on the page).
    
4.  Add this code to your `scripts/main.js` file:
    
    js
    
        // Store a reference to the <h1> in a variable const myHeading = document.querySelector("h1"); // Update the text content of the <h1> myHeading.textContent = "Hello world!"; 
    
5.  Make sure the HTML and JavaScript files are saved, then load `index.html` in your browser. You should see something like this:
    

![Heading "hello world" above a firefox logo](https://developer.mozilla.org/en-US/docs/Learn_web_development/Getting_started/Your_first_website/Adding_interactivity/hello-world.png)

Let's break down how this example works.

We used JavaScript to change the heading text to `Hello world!`. We grabbed a reference to the heading and stored it in a variable called `myHeading` (a container that stores a value). This is similar to how you apply CSS to elements – you first select the elements you want to affect using a CSS selector, and then define the styles you want for those elements. In both cases, when you want to do something to an element, you need to select it first.

Following that, we set the value of the `myHeading` variable's `textContent` property (which represents the `<h1>` element's text content) to _Hello world!_.

The lines that start with `//` are JavaScript comments. In the same way as HTML and CSS comments, the browser ignores these, providing a way for you to add notes about your code to help explain how it works.

Let's move on and add some new features to our example site.

**Warning:** Before going any further, delete the "Hello world!" code from your `main.js` file. If you don't, the existing code will clash with the new code you are about to add.

## Adding an image changer

In this section, you will use JavaScript and DOM API features to alternate the display between two images. This change will happen when a user clicks the displayed image.

1.  Choose another image to feature on your example site. Ideally, the image should be the same size as the one you added previously, or as close as possible.
    
2.  Save this image in your `images` folder.
    
3.  Add the following JavaScript code to your `main.js` file, making sure to replace `firefox2.png` and both instances of `firefox-icon.png` with your second and first image names, respectively.
    
    js
    
        const myImage = document.querySelector("img"); myImage.addEventListener("click", () => { const mySrc = myImage.getAttribute("src"); if (mySrc === "images/firefox-icon.png") { myImage.setAttribute("src", "images/firefox2.png"); } else { myImage.setAttribute("src", "images/firefox-icon.png"); } }); 
    
4.  Save all files and load `index.html` in the browser. Now when you click the image, it should change to the other one.
    

In this code, you stored a reference to your `<img>` element in the `myImage` variable. Then you assigned it a `click` event handler function. Every time the `<img>` is clicked, the function does the following:

*   Retrieves the value of the image's `src` attribute.
    
*   Uses a conditional (`if ... else` structure) to check if the `src` value is equal to the path of the original image:
    
    *   If it is, the code changes the `src` value to the path of the second image, forcing the other image to be loaded inside the `<img>` element.
    *   If it isn't (meaning the image has already been changed), the `src` value swaps back to the original image path.

**Note:** This section introduces several important terms. Key concepts include:

*   API: A set of features that allows a developer to interact with a programming environment. Web APIs (such as the DOM API features we used above) are built on top of the JavaScript language and allow you to manipulate various parts of the browser and the web pages it displays.
*   Events: Things that happen in the browser. They're key to making websites interactive. You can run code in response to events using **event handler functions** – these are code blocks that run when an event occurs. The most common example is the click event, which is fired by the browser when a user clicks on something.
*   Functions: A way of packaging code that you wish to reuse. You can define your code inside a function once and then run it as many times as you like, which helps you avoid writing the same code over and over. In our example here, we defined a `click` event handler function, which runs every time a user clicks the image.
*   Conditionals: Code structures used to test if an expression returns `true` or `false` and run different code in response to each result. A very common form of conditionals is the `if...else` statement.

## Adding a personalized welcome message

Next, let's change the page heading to show a personalized welcome message when the user first visits the site. This welcome message will be saved in the browser using the Web Storage API, so if the user leaves the site and returns later, their personalized data will still be there. We'll also include a way for the user to change the message.

1.  In `index.html`, add the following line just before the closing `</body>` tag:
    
    html
    
        <button>Change user</button> 
    
2.  In `main.js`, place the following code at the bottom of the file, exactly as it is written. This creates references to the new button and the heading, storing each inside variables:
    
    js
    
        let myButton = document.querySelector("button"); let myHeading = document.querySelector("h1"); 
    
3.  Add the following function to set the personalized greeting. This won't do anything yet; we will call the function later on.
    
    js
    
        function setUserName() { const myName = prompt("Please enter your name."); localStorage.setItem("name", myName); myHeading.textContent = `Mozilla is cool, ${myName}`; } 
    
    The `setUserName()` function contains a `prompt()` function, which asks the user to enter data and stores it in a variable after they click _OK_. In this example, we're asking the user to enter a name and storing it in `myName`.
    
    Next, the code uses the Web Storage API, which allows us to store data in the browser and retrieve it later. We use the `localStorage.setItem()` function to create and store a data item called `"name"`, setting its value to the `myName` variable, which contains the user's input.
    
    Finally, we set the `textContent` of the heading to a string that includes the user's stored name.
    
4.  Add the following conditional block after the function declaration. This is our _initialization code_ — it runs when the page first loads to start the program off:
    
    js
    
        if (!localStorage.getItem("name")) { setUserName(); } else { const storedName = localStorage.getItem("name"); myHeading.textContent = `Mozilla is cool, ${storedName}`; } 
    
    The first line of this block uses the negation operator (logical NOT, represented by the `!` character) to check whether the `name` data item is _not_ already stored in `localStorage`. If not, the `setUserName()` function runs to create it. If it exists (that is, the user set a username during a previous visit), we retrieve the stored name using `localStorage.getItem()` and set the `textContent` of the heading to a string, plus the user's name – just like we did inside `setUserName()`.
    
5.  Add a `click` event handler function to the button. When clicked, `setUserName()` runs. This allows the user to store a different name if they want to.
    
    js
    
        myButton.addEventListener("click", () => { setUserName(); }); 
    
6.  Save all files and load `index.html` in the browser. You should immediately be asked to enter your name. After you do so, it will appear inside the `<h1>` as part of the personalized greeting. Notice how the personalization persists even after you reload the page. You can click the "Change user" button to enter a new name.
    

**Note:** The term operator refers to a JavaScript language character that carries out an operation on one or more values. Examples include `+` (adds values), `-` (subtracts one value from another), and `!` (negates a value — as you saw earlier).

## A user name of null?

When you run the example and get the dialog box that prompts you to enter your name, try pressing the _Cancel_ button. You should end up with a title that reads _Mozilla is cool, null_. This happens because the value is set to `null` when you cancel the prompt. In JavaScript, _null_ is a special value that represents the absence of a value.

Also, try clicking _OK_ without entering a name. You should end up with a title that reads _Mozilla is cool,_ because you've set `myName` to an empty string.

To avoid these problems, you can add another conditional to check that the user hasn't entered a blank name. Update your `setUserName()` function to the following:

js

    function setUserName() { const myName = prompt("Please enter your name."); if (!myName) { setUserName(); } else { localStorage.setItem("name", myName); myHeading.textContent = `Mozilla is cool, ${myName}`; } } 

In human language, this means: If `myName` has no value, run `setUserName()` again from the start. If it does have a value (if the above statement is not true), then store the value in `localStorage` and set it as the heading's text.

## Conclusion

If you have followed all the instructions in this article, you should end up with a page that looks something like the image below. You can also view our version.

![Final look of HTML page after creating elements: a header, large centered logo, content, and a button](https://developer.mozilla.org/en-US/docs/Learn_web_development/Getting_started/Your_first_website/Adding_interactivity/website-screen-scripted.png)

If you get stuck, you can compare your work with our finished example code on GitHub.

We've only really scratched the surface of JavaScript in this article. You'll learn a lot more in our Dynamic scripting with JavaScript Core module later on in the course.

## See also

Scrimba: Learn JavaScript _MDN learning partner_

Scrimba's _Learn JavaScript_ course teaches you JavaScript through solving 140+ interactive coding challenges, building projects including a game, a browser extension, and even a mobile app. Scrimba features fun interactive lessons taught by knowledgeable teachers.

Learn JavaScript

This is an excellent resource for aspiring web developers! Learn JavaScript in an interactive environment, with short lessons and interactive tests, guided by an automated assessment. The first 40 lessons are free. The complete course is available for a small one-time payment.

*   Previous
*   Overview: Your first website
*   Next

---

## Page: https://developer.mozilla.org/en-US/docs/Learn_web_development/Getting_started/Your_first_website/Publishing_your_website

## Publishing your website

*   Previous
*   Overview: Your first website
*   Next

Once you finish writing the code and organizing the files that make up your website, you need to put it all online so people can find it. This article explains how to get your sample website online with little effort.

**Note:** You'll need a sample website available on your local computer to follow along with this article. It should contain at least a valid `index.html` file. If you've not done so already, we'd advise you to build one by working through the previous articles in this module, starting with What will your website look like?.

<table><tbody><tr><th scope="row">Prerequisites:</th><td>Basic familiarity with your computer operating system, the basic software you will use to build a website, and file systems.</td></tr><tr><th scope="row">Learning outcomes:</th><td><ul><li>The basic tools and concepts involved in publishing a website — hosting, domains, FTP programs.</li><li>What alternative hosting options are available, for example Google App Engine, GitHub, and CodePen.</li><li>Publishing a website using GitHub Pages.</li><li>Hosting, how to purchase it, and how to put a website online.</li><li>How to register a domain.</li></ul></td></tr></tbody></table>

## What are the options?

Publishing a website is a complex topic because there are many ways to go about it. This article doesn't attempt to document all the possible methods. Instead, it explains the advantages and disadvantages of three approaches that are practical for beginners. Then it steps through one method that can work right away for many readers.

### Getting hosting and a domain name

To have more control over content and website appearance, most professionals/businesses choose to buy web hosting and a domain name:

*   Web hosting is rented file space on a hosting company's web server. You put website files on the web server. The web server provides website content to website visitors.
*   A domain name is the unique web address where people find your website, such as `https://www.mozilla.org` or `https://www.bbc.co.uk`. You can rent your domain name for as many years as you want from a **domain registrar**.

If you get your web hosting _and_ domain name from the same company, they tend to be configured automatically to talk to one another. However, If you get them from separate companies, or want to change your hosting to a different company, you need to do a bit of setup to point the domain name to the correct server. This is so that people will see your website when they navigate to that web address. This is usually done by logging into your domain registrar's website, and setting your domain's nameservers to the ones provided by your hosting company.

Companies use various mechanisms to transfer files to their web servers. Many will have more than one option; typical options include:

*   A drag and drop interface (you'll see an example of this in Publishing via GitHub, later on).
*   An File Transfer Protocol (FTP) program. FTP programs vary widely, but generally, you have to connect to your web server using details provided by your hosting company (typically username, password, hostname). Then the program shows you your local files and the web server's files in two windows, and provides a way for you to transfer files back and forth.
*   Keeping website source code in a GitHub repo (see below) and granting the hosting company access so they can fetch the source, build it if necessary, and publish it.
*   Some companies will provide command line tools for you to use to transfer your files.

#### Tips for finding hosting and domains

*   MDN does not promote specific commercial hosting companies or domain name registrars. To find hosting companies and registrars, just search for "web hosting" and "domain names". All registrars will have a feature to allow you to check if the domain name you want is available.
*   Your home or office internet service provider may provide some limited hosting for a small website. The available feature set will be limited, but it might be perfect for your first experiments.
*   There are also free services available like Neocities, Google Sites, and WordPress. Such services can be limited in scope, but they are good enough for initial experiments.

### Using an online tool like GitHub or Google App Engine

Some tools let you publish your website online:

*   GitHub is a "social coding" site. It allows you to upload code repositories for storage in the Git **version control system.** You can then collaborate on code projects, and the system is open-source by default, meaning that anyone in the world can find your GitHub code, use it, learn from it, and improve on it. GitHub has a very useful feature called GitHub Pages, which allows you to expose website code live on the web.
*   Google App Engine is a powerful platform that lets you build and run applications on Google's infrastructure — whether you need to build a multi-tiered web application from scratch or host a static website. See How do you host your website on Google App Engine? for more information.

These options are generally free, with a limited feature-set.

### Using a web-based IDE such as CodePen

There are a number of web apps that emulate a website development environment, allowing you to write HTML, CSS and JavaScript, which is then rendered and displayed in an output pane. Generally speaking, these tools are easy to use, great for learning, good for sharing code (for example, if you want to share a technique with or ask for debugging help from colleagues in a different office), and free (for basic features). They host your rendered page at a unique web address. However, the features are limited, and these apps often don't provide hosting space for assets (like images).

Try playing with some of these examples to find out which one works best for you:

*   Scrimba _MDN learning partner_
*   JSFiddle
*   Glitch
*   JS Bin
*   CodePen

## Publishing via GitHub

Now let's examine how to publish your site via GitHub Pages.

1.  First of all, sign up for GitHub and verify your email address.
    
2.  Next, you need to create a repository to store files. On this page:
    
    1.  in the _Repository name_ box, enter _username_.github.io, where _username_ is your username. For example, our friend Bob Smith would enter _bobsmith.github.io_.
    2.  Click the _Create repository_ button at the bottom of the page.
3.  On the next page, find the _uploading an existing file_ link, and click on it. This should bring you to the file upload page.
    
4.  At this point, you should be able to drag and drop files from your local file system onto the web page to upload them to the GitHub repository. To do so:
    
    1.  Open a file explorer/finder window on your computer.
    2.  Make sure you can see the file explorer _and_ the web browser windows — position them next to one another on your screen.
    3.  Navigate the file explorer window to the folder containing your sample website.
        
        **Note:** Make sure your folder has an `index.html` file.
        
    4.  Select all of your sample website's files (for example using the Ctrl + A keyboard shortcut, or Cmd + A on macOS).
    5.  Drag the files from your file explorer over the "Drag files here to add them to your repository" section of the GitHub page.
    6.  The section's border and text changes to indicate a drop is possible. Drop the files at this point.
    7.  Click the _Commit changes_ button at the bottom of the page.
5.  Navigate your browser to _username_.github.io to see your website online. For example, for the username _chrisdavidmills_, go to _chrisdavidmills_.github.io.
    
    **Note:** It may take a few minutes for your website to go live. If your website does not display immediately, wait a few minutes and try again.
    

To learn more, see GitHub Pages Help.

## Further reading

*   What is a web server
*   Understanding domain names
*   How much does it cost to do something on the web?
*   Deploy a Website: A nice tutorial from Codecademy that goes a bit further and shows some additional techniques.

*   Previous
*   Overview: Your first website
*   Next