---
rerun_command: node web2llm.js -u "https://developer.mozilla.org/en-US/docs/Learn_web_development/Getting_started/Your_first_website" --output "test/fixtures/mdn-text.expected.md"
---

## Page: https://developer.mozilla.org/en-US/docs/Learn_web_development/Getting_started/Your_first_website

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

As with images, many fonts are protected by licenses, meaning you cannot freely use them in your site. Google Fonts is a web service owned by Google that provides access to many fonts.

Once you have found a font, there are two main ways of using it:

1.  Add a reference in your code to load the font from Google's servers.
2.  Download the font file to your own system, host the font yourself, and use your hosted copy in your website's code.

**Note:** Serving fonts hosted on Google Fonts may be incompatible with the European Union's data privacy regulation GDPR as the font service exposes the user's IP address. If this is a potential problem for you, then either choose the second option or choose a font provider that is GDPR compliant, such as Bunny Fonts.

Alternatively you can use safe web fonts such as Arial, Times New Roman, or Courier New.

*   Overview: Your first website
*   Next

---

## Page: https://developer.mozilla.org/en-US/docs/Learn_web_development/Getting_started/Your_first_website/Creating_the_content

*   Previous
*   Overview: Your first website
*   Next

HTML (**H**yper**T**ext **M**arkup **L**anguage) is the code that is used to structure a web page and its content. For example, content could be structured within a set of paragraphs, a list of bulleted points, or using images and data tables. This article provides a basic understanding of HTML and its functions, and shows you how to create the basic content for your first website.

<table><tbody><tr><th scope="row">Prerequisites:</th><td>Basic familiarity with your computer operating system, the basic software you will use to build a website, and file systems.</td></tr><tr><th scope="row">Learning outcomes:</th><td><ul><li>The purpose and function of HTML.</li><li>The basic parts of HTML syntax — opening and closing tags, elements, attributes, head, body.</li><li>Common HTML elements including paragraphs, headings, images, lists, and links.</li></ul></td></tr></tbody></table>

## So what is HTML?

HTML is a _markup language_ that defines the structure of your content. HTML consists of a series of **elements**, which you use to enclose, or wrap, different parts of the content to make it appear a certain way, or act a certain way. The enclosing tags can make a word or image hyperlink to somewhere else, can italicize words, can make the font bigger or smaller, and so on. For example, take the following line of content:

My cat is very grumpy

If we wanted the line to stand by itself, we could specify that it is a paragraph by enclosing it in paragraph tags:

    <p>My cat is very grumpy</p>
    

### Anatomy of an HTML element

Let's explore this paragraph element a bit further.

![paragraph element including opening tag, content reading 'my cat is very grumpy', and a closing tag](https://developer.mozilla.org/en-US/docs/Learn_web_development/Getting_started/Your_first_website/Creating_the_content/grumpy-cat-small.png)

The main parts of our element are as follows:

1.  **The opening tag:** This consists of the name of the element (in this case, p), wrapped in opening and closing **angle brackets**. This states where the element begins or starts to take effect — in this case where the paragraph begins.
2.  **The closing tag:** This is the same as the opening tag, except that it includes a _forward slash_ before the element name. This states where the element ends — in this case where the paragraph ends. Failing to add a closing tag is one of the standard beginner errors and can lead to strange results.
3.  **The content:** This is the content of the element, which in this case, is just text.
4.  **The element:** The opening tag, the closing tag, and the content together comprise the element.

Elements can also have attributes that look like the following:

![Paragraph opening tag with a class attribute highlighted: class=editor-note](https://developer.mozilla.org/en-US/docs/Learn_web_development/Getting_started/Your_first_website/Creating_the_content/grumpy-cat-attribute-small.png)

Attributes contain extra information about the element that you don't want to appear in the actual content. Here, `class` is the attribute _name_ and `editor-note` is the attribute _value_. The `class` attribute allows you to give the element a non-unique identifier that can be used to target it (and any other elements with the same `class` value) with style information and other things. Some attributes have no value, such as `required`.

Attributes that set a value always have:

1.  A space between it and the element name (or the previous attribute, if the element already has one or more attributes).
2.  The attribute name followed by an equal sign.
3.  The attribute value wrapped by opening and closing quotation marks.

**Note:** Simple attribute values that don't contain ASCII whitespace (or any of the characters `"` `'` `` ` `` `=` `<` `>`) can remain unquoted, but it is recommended that you quote all attribute values, as it makes the code more consistent and understandable.

### Nesting elements

You can put elements inside other elements too — this is called **nesting**. If we wanted to state that our cat is **very** grumpy, we could wrap the word "very" in a `<strong>` element, which means that the word is to be strongly emphasized:

    <p>My cat is <strong>very</strong> grumpy.</p>
    

You do however need to make sure that your elements are properly nested. In the example above, we opened the `<p>` element first, then the `<strong>` element; therefore, we have to close the `<strong>` element first, then the `<p>` element. The following is incorrect:

    <p>My cat is <strong>very grumpy.</p></strong>
    

The elements have to open and close correctly so that they are clearly inside or outside one another. If they overlap as shown above, then your web browser will try to make the best guess at what you were trying to say, which can lead to unexpected results. So don't do it!

### Void elements

Some elements have no content and are called **void elements**. Take the `<img>` element that we already have in our HTML page:

    <img src="images/firefox-icon.png" alt="My test image" />
    

This contains two attributes, but there is no closing `</img>` tag and no inner content. This is because an image element doesn't wrap content to affect it. Its purpose is to embed an image in the HTML page in the place it appears.

## Creating your first HTML document

That wraps up the basics of individual HTML elements, but they aren't very useful on their own. Now we'll look at how individual elements are combined to form an entire HTML page. Let's create a basic HTML file, and have a look at what it is made up of:

1.  Inside your `web-projects` folder, create another new folder called `first-website`.
2.  Inside `first-website`, Create a new file called `index.html`, and insert the following code into the file exactly as shown:

    <!doctype html>
    <html lang="en-US">
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width" />
        <title>My test page</title>
      </head>
      <body>
        <img src="" alt="My test image" />
      </body>
    </html>
    

Here, we have the following:

*   `<!doctype html>` — The doctype is a required preamble. In the mists of time, when HTML was young (around 1991/92), doctypes were meant to act as links to a set of rules that the HTML page had to follow to be considered good HTML, which could mean automatic error checking and other useful things. However, these days, they don't do much and are basically just needed to make sure your document behaves correctly. That's all you need to know for now.
*   `<html></html>` — the `<html>` element. This element wraps all the content on the entire page and is sometimes known as the root element. It also includes the `lang` attribute, setting the primary language of the document.
*   `<head></head>` — the `<head>` element. This element acts as a container for all the stuff you want to include on the HTML page that _isn't_ the content you are showing to your page's viewers. This includes things like keywords and a page description that you want to appear in search results, CSS to style our content, character set declarations, and more.
*   `<meta charset="utf-8">` — This element sets the character set your document should use to UTF-8 which includes most characters from the vast majority of written languages. Essentially, it can now handle any textual content you might put on it. There is no reason not to set this, and it can help avoid some problems later on.
*   `<meta name="viewport" content="width=device-width">` — This viewport element ensures the page renders at the width of viewport, preventing mobile browsers from rendering pages wider than the viewport and then shrinking them down.
*   `<title></title>` — the `<title>` element. This sets the title of your page, which is the title that appears in the browser tab the page is loaded in. It is also used to describe the page when you bookmark/favorite it.
*   `<body></body>` — the `<body>` element. This contains _all_ the content that you want to show to web users when they visit your page, whether that's text, images, videos, games, playable audio tracks, or whatever else.

## Images

Let's turn our attention to the `<img>` element:

    <img src="" alt="My test image" />
    

This embeds an image into our page in the position it appears. It does this via the `src` (source) attribute, which contains the path to our image file.

We have also included an `alt` (alternative) attribute. In the `alt` attribute, you specify descriptive text for users who cannot see the image, possibly because of the following reasons:

1.  They are visually impaired. Users with significant visual impairments often use tools called screen readers to read out the alt text to them.
2.  Something has gone wrong causing the image not to display. If the `src` attribute does not contain a valid path to an image, the alt text will be displayed instead:

![The words: my test image](https://developer.mozilla.org/en-US/docs/Learn_web_development/Getting_started/Your_first_website/Creating_the_content/alt-text-example.png)

The keywords for alt text are "descriptive text". The alt text you write should provide the reader with enough information to have a good idea of what the image conveys. In this example, our current text of "My test image" is no good at all. A much better alternative for our Firefox logo would be "The Firefox logo: a flaming fox surrounding the Earth."

Let's get your image displaying now.

1.  Inside the `first-website` folder, Create a new folder called `images`, and put the image you chose in the previous example inside this folder.
2.  Inside the `<img>` tag's `src` attribute value, enter the path to your image. It is inside a folder called `images`, which is inside the same directory as your `index.html` file, therefore the path will be `images/` plus the name of your image. For example, if your image was called `firefox-icon.png`, your `src` attribute would look like this: `src="images/firefox-icon.png"`.
3.  replace the `alt` attribute value — `My test image` — with some text that better describes your image.
4.  Open your `index.html` file inside a web browser. You should see your image displayed. If not, check your `<img>` element against our code above; make sure it is not missing any of the syntax, such as the quote marks. Make sure the image filename is correct.

**Note:** If the image is really large and therefore doesn't fit on the screen, don't worry about this. We'll fix this issue in the next article. Find out more about using an `alt` attribute for images in various situations in our accessible multimedia tutorial and An alt Decision Tree.

## Marking up text

This section will cover some essential HTML elements you'll use for marking up the text.

### Headings

Heading elements allow you to specify that certain parts of your content are headings — or subheadings. In the same way that a book has the main title, chapter titles, and subtitles, an HTML document can too. HTML contains 6 heading levels, <h1> - <h6>, although you'll commonly only use 3 to 4 at most:

    <!-- 4 heading levels: -->
    <h1>My main title</h1>
    <h2>My top level heading</h2>
    <h3>My subheading</h3>
    <h4>My sub-subheading</h4>
    

**Note:** Anything in HTML between `<!--` and `-->` is an **HTML comment**. The browser ignores comments as it renders the code. In other words, they are not visible on the page - just in the code. HTML comments are a way for you to write helpful notes about your code or logic.

Now try adding a suitable main title to your HTML page just above your `<img>` element. Save the file and view it in a browser to see the effect.

**Note:** You'll see that your heading level 1 has an implicit style. Don't use heading elements to make text bigger or bold, because they are used for accessibility and other reasons such as SEO. Try to create a meaningful sequence of headings on your pages, without skipping levels.

### Paragraphs

As explained above, `<p>` elements are for containing paragraphs of text; you'll use these frequently when marking up regular text content:

    <p>This is a single paragraph</p>
    

Add your sample text from the previous article into one or a few paragraphs, placed directly below your `<img>` element. Save it and look at your page in a browser.

### Lists

A lot of the web's content is lists and HTML has special elements for these. Marking up lists always consists of at least 2 elements. The most common list types are ordered and unordered lists:

1.  **Unordered lists** are for lists where the order of the items doesn't matter, such as a shopping list. These are wrapped in a `<ul>` element.
2.  **Ordered lists** are for lists where the order of the items does matter, such as a list of cooking instructions in a recipe. These are wrapped in an `<ol>` element.

Each item inside the lists is put inside an `<li>` (list item) element.

For example, if we wanted to turn the part of the following paragraph fragment into a list

    <p>
      At Mozilla, we're a global community of technologists, thinkers, and builders
      working together…
    </p>
    

We could modify the markup to this

    <p>At Mozilla, we're a global community of</p>
    
    <ul>
      <li>technologists</li>
      <li>thinkers</li>
      <li>builders</li>
    </ul>
    
    <p>working together…</p>
    

Try adding an ordered or unordered list to your example page, and view the result in a browser.

## Links

Links are very important — they are what makes the web a web! To add a link, we need to use a specific element — `<a>` — "a" being the short form for "anchor". To make text within your paragraph into a link, follow these steps:

1.  Choose some text. We chose the text "Mozilla Manifesto".
    
2.  Wrap the text in an `<a>` element, as shown below:
    
        <a>Mozilla Manifesto</a>
        
    
3.  Give the `<a>` element an `href` attribute, as shown below:
    
        <a href="">Mozilla Manifesto</a>
        
    
4.  Fill in the value of this attribute with the web address that you want the link to point to:
    
        <a href="https://www.mozilla.org/en-US/about/manifesto/">
          Mozilla Manifesto
        </a>
        
    

You might get unexpected results if you omit the `https://` or `http://` part, called the _protocol_, at the beginning of the web address. After making a link, click it to make sure it is sending you where you wanted it to.

**Note:** `href` might appear like a rather obscure choice for an attribute name at first. If you are having trouble remembering it, remember that it stands for _**h**ypertext **ref**erence_.

Add a link to your page now, if you haven't already done so.

## Conclusion

If you have followed all the instructions in this article, you should end up with a page that looks like the one below (you can also view it here):

![A web page screenshot showing a Firefox logo, a heading saying Mozilla is cool, and two paragraphs of filler text](https://developer.mozilla.org/en-US/docs/Learn_web_development/Getting_started/Your_first_website/Creating_the_content/finished-test-page-small.png)

If you get stuck, you can always compare your work with our finished example code on GitHub.

Here, we have only really scratched the surface of HTML. You'll learn a lot more in our Structuring content with HTML Core module.

*   Previous
*   Overview: Your first website
*   Next

---

## Page: https://developer.mozilla.org/en-US/docs/Learn_web_development/Getting_started/Your_first_website/Styling_the_content

*   Previous
*   Overview: Your first website
*   Next

CSS (Cascading Style Sheets) is the code that styles web content. _Styling the content_ walks through what you need to get started. We'll answer questions like: How do I make text red? How do I make content display at a certain location in the (webpage) layout? How do I decorate my webpage with background images and colors?

<table><tbody><tr><th scope="row">Prerequisites:</th><td>Basic familiarity with your computer operating system, the basic software you will use to build a website, and file systems.</td></tr><tr><th scope="row">Learning outcomes:</th><td><ul><li>The purpose and function of CSS.</li><li>The basic parts of CSS syntax — rulesets, selectors, declarations, properties, property values.</li><li>Common CSS functionality including box model, changing colors and fonts, and positioning HTML elements.</li></ul></td></tr></tbody></table>

## What is CSS?

Like HTML, CSS is not a programming language. It's not a markup language either. **CSS is a style sheet language.** CSS is what you use to selectively style HTML elements. For example, this CSS selects paragraph text, setting the color to red:

    p {
      color: red;
    }
    

Let's try it out!

1.  Inside your `first-website` folder, create another new folder called `styles`.
2.  Using a text editor, paste the three lines of CSS shown above into a new file.
3.  Save the file inside your `styles` folder with a filename of `style.css`.

To make the code work, we still need to apply this CSS (above) to your HTML document. Otherwise, the styling won't change the appearance of the HTML.

1.  Open your `index.html` file. Paste the following line inside the HTML head (between the `<head>` and `</head>` tags):
    
        <link href="styles/style.css" rel="stylesheet" />
        
    
2.  Save `index.html` and load it in your browser. You should see something like this:
    

![A Mozilla logo and some paragraphs. The paragraph text has been styled red by our css.](https://developer.mozilla.org/en-US/docs/Learn_web_development/Getting_started/Your_first_website/Styling_the_content/website-screenshot-styled.png)

If your paragraph text is red, congratulations! Your CSS is working.

## Anatomy of a CSS ruleset

Let's dissect the CSS code for red paragraph text to understand how it works:

![CSS p declaration color red](https://developer.mozilla.org/en-US/docs/Learn_web_development/Getting_started/Your_first_website/Styling_the_content/css-declaration-small.png)

The whole structure is called a **ruleset**. (The term _ruleset_ is often referred to as just _rule_.) Note the names of the individual parts:

Selector

This is the HTML element name at the start of the ruleset. It defines the element(s) to be styled (in this example, `<p>` elements). To style a different element, change the selector.

Declaration

This is a single rule like `color: red;`. It specifies which of the element's **properties** you want to style.

Properties

These are features of an HTML element that you can change the values of, to make it styled differently. (In this example, `color` is a property of the `<p>` elements.) In CSS, you choose which properties you want to affect in the rule.

Property value

To the right of the property—after the colon—there is the **property value**. This chooses one out of many possible appearances for a given property. (For example, there are many `color` values in addition to `red`.)

Note the other important parts of the syntax:

*   Apart from the selector, each ruleset must be wrapped in curly braces. (`{}`)
*   Within each declaration, you must use a colon (`:`) to separate the property from its value or values.
*   Within each ruleset, you must use a semicolon (`;`) to separate each declaration from the next one.

To modify multiple property values in one ruleset, write them separated by semicolons, like this:

    p {
      color: red;
      width: 500px;
      border: 1px solid black;
    }
    

### Selecting multiple elements

You can also select multiple elements and apply a single ruleset to all of them. Separate multiple selectors by commas. For example:

    p,
    li,
    h1 {
      color: red;
    }
    

### Different types of selectors

There are many different types of selectors. The examples above use **element selectors**, which select all elements of a given type. But we can make more specific selections as well. Here are some of the more common types of selectors:

| Selector name | What does it select | Example |
| --- | --- | --- |
| Element selector (sometimes called a tag or type selector) | All HTML elements of the specified type. | `p`  
selects `<p>` |
| ID selector | The element on the page with the specified ID. On a given HTML page, each id value should be unique. | `#my-id`  
selects `<p id="my-id">` or `<a id="my-id">` |
| Class selector | The element(s) on the page with the specified class. Multiple instances of the same class can appear on a page. | `.my-class`  
selects `<p class="my-class">` and `<a class="my-class">` |
| Attribute selector | The element(s) on the page with the specified attribute. | `img[src]`  
selects `<img src="my-image.png">` but not `<img>` |
| Pseudo-class selector | The specified element(s), but only when in the specified state. (For example, when a cursor hovers over a link.) | `a:hover`  
selects `<a>`, but only when the mouse pointer is hovering over the link. |

There are many more selectors to discover. To learn more, see our selectors tutorials, starting with Basic selectors.

## Fonts and text

Now that we've explored some CSS fundamentals, let's improve the appearance of the example by adding more rules and information to the `style.css` file.

1.  First, find the output from Google Fonts that you previously saved from What will your website look like?. Add the `<link>` element somewhere inside your `index.html`'s head (anywhere between the `<head>` and `</head>` tags). It looks something like this:
    
        <link
          href="https://fonts.googleapis.com/css?family=Open+Sans"
          rel="stylesheet" />
        
    
    This code links your page to a style sheet that loads the Open Sans font family with your webpage.
    
2.  Next, delete the existing rule you have in your `style.css` file. It was a good test, but let's not continue with lots of red text.
    
3.  Add the following lines (shown below), replacing the `font-family` assignment with your `font-family` selection from What will your website look like?. The property `font-family` refers to the font(s) you want to use for text. This rule defines a global base font and font size for the whole page. Since `<html>` is the parent element of the whole page, all elements inside it inherit the same `font-size` and `font-family`.
    
        html {
          font-size: 10px; /* px means "pixels": the base font size is now 10 pixels high */
          font-family:
            "Open Sans", sans-serif; /* this should be the rest of the output you got from Google Fonts */
        }
        
    
    **Note:** Anything in CSS between `/*` and `*/` is a **CSS comment**. The browser ignores comments as it renders the code. CSS comments are a way for you to write helpful notes about your code or logic.
    
4.  Now let's set font sizes for elements that will have text inside the HTML body (<h1>, `<li>`, and `<p>`). We'll also center the heading. Finally, let's expand the second ruleset (below) with settings for line height and letter spacing to make body content more readable.
    
        h1 {
          font-size: 60px;
          text-align: center;
        }
        
        p,
        li {
          font-size: 16px;
          line-height: 2;
          letter-spacing: 1px;
        }
        
    

Adjust the `px` values as you like. Your work-in-progress should look similar to this:

![A Mozilla logo and some paragraphs. A sans-serif font has been set, the font sizes, line height and letter spacing are adjusted, and the main page heading has been centered](https://developer.mozilla.org/en-US/docs/Learn_web_development/Getting_started/Your_first_website/Styling_the_content/website-screenshot-font-small.png)

## CSS: all about boxes

Something you'll notice about CSS as you use it more: a lot of it is about boxes. This includes setting size, color, and position. Most HTML elements on your page can be thought of as boxes sitting on top of other boxes.

![A big stack of boxes or crates sat on top of one another](https://developer.mozilla.org/en-US/docs/Learn_web_development/Getting_started/Your_first_website/Styling_the_content/boxes.jpg)

Photo from https://www.geograph.org.uk/photo/3418115 Copyright © Jim Barton cc-by-sa/2.0

CSS layout is mostly based on the _box model._ Each box taking up space on your page has properties like:

*   `padding`, the space around the content. In the example below, it is the space around the paragraph text.
*   `border`, the solid line that is just outside the padding.
*   `margin`, the space around the outside of the border.

![Three boxes sat inside one another. From outside to in they are labelled margin, border and padding](https://developer.mozilla.org/en-US/docs/Learn_web_development/Getting_started/Your_first_website/Styling_the_content/box-model.png)

In this section we also use:

*   `width` (of an element).
*   `background-color`, the color behind an element's content and padding.
*   `color`, the color of an element's content (usually text).
*   `text-shadow` sets a drop shadow on the text inside an element.
*   `display` sets the display mode of an element. (keep reading to learn more)

To continue, let's add more CSS. Keep adding these new rules at the bottom of `style.css`. Experiment with changing values to see what happens.

### Changing the page color

    html {
      background-color: #00539f;
    }
    

This rule sets a background color for the entire page. Change the color code to the color you chose in What will my website look like?.

### Styling the body

    body {
      width: 600px;
      margin: 0 auto;
      background-color: #ff9500;
      padding: 0 20px 20px 20px;
      border: 5px solid black;
    }
    

The above code sets new values for several properties of the `<body>` element. Let's go through these line-by-line:

*   `width: 600px;` This forces the body to always be 600 pixels wide.
*   `margin: 0 auto;` When you set two values on a property like `margin` or `padding`, the first value affects the element's top _and_ bottom side (setting it to `0` in this case); the second value affects the left _and_ right side. (Here, `auto` is a special value that divides the available horizontal space evenly between left and right). You can also use one, two, three, or four values, as documented in Margin Syntax.
*   `background-color: #FF9500;` This sets the element's background color. This project uses a reddish orange for the body background color, as opposed to dark blue for the `<html>` element. (Feel free to experiment.)
*   `padding: 0 20px 20px 20px;` This sets four values for padding. The goal is to put some space around the content. In this example, there is no padding on the top of the body, and 20 pixels on the right, bottom and left. The values set top, right, bottom, left, in that order. As with `margin`, you can use one, two, three, or four values, as documented in Padding Syntax.
*   `border: 5px solid black;` This sets values for the width, style and color of the border. In this case, it's a five-pixel–wide, solid black border, on all sides of the body.

### Positioning and styling the main page title

    h1 {
      margin: 0;
      padding: 20px 0;
      color: #00539f;
      text-shadow: 3px 3px 1px black;
    }
    

You may have noticed there's a horrible gap at the top of the body. That happens because browsers apply default styling to the h1 element (among others). That might seem like a bad idea, but the intent is to provide basic readability for unstyled pages. To eliminate the gap, we overwrite the browser's default styling with the setting `margin: 0;`.

Next, we set the heading's top and bottom padding to 20 pixels.

Following that, we set the heading text to be the same color as the HTML background color.

Finally, `text-shadow` applies a shadow to the text content of the element. Its four values are:

*   The first pixel value sets the **horizontal offset** of the shadow from the text: how far it moves across.
*   The second pixel value sets the **vertical offset** of the shadow from the text: how far it moves down.
*   The third pixel value sets the **blur radius** of the shadow. A larger value produces a more fuzzy-looking shadow.
*   The fourth value sets the base color of the shadow.

Try experimenting with different values to see how it changes the appearance.

### Centering the image

    img {
      display: block;
      margin: 0 auto;
      max-width: 100%;
    }
    

Next, we center the image to make it look better. We could use the same `margin: 0 auto` trick as we did for the body. But there are differences that require an additional setting to make the CSS work.

The `<body>` is a **block** element, meaning it takes up space on the page. The margin applied to a block element will be respected by other elements on the page. In contrast, images are **inline** elements; for the auto margin trick to work on this image, we must give it block-level behavior using `display: block;`.

Finally, we include `max-width: 100%;` to make sure that, if the image is larger than the `width` set on the body (600 pixels), it will be displayed at this width, and no bigger.

**Note:** Don't be too concerned if you don't completely understand `display: block;` and the differences between a block element and an inline element, or `max-width: 100%;`. They will make more sense as you continue your study of CSS. You can find more information about these properties on MDN's `display` and `max-width` reference pages.

## Conclusion

If you followed all the instructions in this article, you should have a page that looks similar to this one:

![A Mozilla logo, centered, and a header and paragraphs. It now looks nicely styled, with a blue background for the whole page and orange background for the centered main content strip.](https://developer.mozilla.org/en-US/docs/Learn_web_development/Getting_started/Your_first_website/Styling_the_content/website-screenshot-final.png)

(You can view our version here.) If you get stuck, you can always compare your work with our finished example code on GitHub.

In this article, we have just scratched the surface of CSS. Our Core modules, starting with the CSS styling basics module, will cover it in a lot more detail.

*   Previous
*   Overview: Your first website
*   Next

---

## Page: https://developer.mozilla.org/en-US/docs/Learn_web_development/Getting_started/Your_first_website/Adding_interactivity

*   Previous
*   Overview: Your first website
*   Next

JavaScript is a programming language that adds interactivity to websites. This happens in games, in the behavior of responses when buttons are pressed or with data entry on forms, with dynamic styling, with animation, etc. This article helps you get started with JavaScript and furthers your understanding of what is possible.

<table><tbody><tr><th scope="row">Prerequisites:</th><td>Basic familiarity with your computer operating system, the basic software you will use to build a website, and file systems.</td></tr><tr><th scope="row">Learning outcomes:</th><td><ul><li>The purpose and function of JavaScript.</li><li>JavaScript language fundamentals such as variables, operators, conditionals, functions, and events.</li></ul></td></tr></tbody></table>

## What is JavaScript?

JavaScript is a powerful programming language that can add interactivity to a website. It was invented by Brendan Eich.

JavaScript is versatile and beginner-friendly. With more experience, you'll be able to create games, animated 2D and 3D graphics, comprehensive database-driven apps, and much more!

JavaScript itself is relatively compact, yet very flexible. Developers have written a variety of tools on top of the core JavaScript language, unlocking a vast amount of functionality with minimum effort. These include:

*   Browser Application Programming Interfaces (APIs) built into web browsers, providing functionality such as dynamically creating HTML and setting CSS styles, collecting and manipulating a video stream from a user's webcam, or generating 3D graphics and audio samples.
*   Third-party APIs that allow developers to incorporate functionality in sites from other content providers, such as YouTube or Facebook.
*   Third-party frameworks and libraries that you can apply to HTML to accelerate the work of building sites and applications.

It's outside the scope of this article—as a light introduction to JavaScript—to present the details of how the core JavaScript language is different from the tools listed above. You can learn more in our Core modules, as well as in other parts of MDN.

The section below introduces some aspects of the core language and offers an opportunity to play with a few browser API features too. Have fun!

## A "Hello world!" example

JavaScript is one of the most popular modern web technologies! As your JavaScript skills grow, your websites will enter a new dimension of power and creativity.

However, getting comfortable with JavaScript is more challenging than getting comfortable with HTML and CSS. You should start small, and progress gradually. To begin, let's examine how to add JavaScript to your page for creating a _Hello world!_ example. (_Hello world!_ is the standard for introductory programming examples.)

**Warning:** If you haven't been following along with the rest of our course, download this example code and use it as a starting point.

1.  Inside your `first-website` folder, create a new folder named `scripts`.
    
2.  Within the `scripts` folder, create a new text document called `main.js`, and save it.
    
3.  Go to your `index.html` file and enter this code on a new line, just before the closing `</body>` tag:
    
        <script src="scripts/main.js"></script>
        
    
    This is doing the same job as the `<link>` element for CSS. It applies the JavaScript to the page, so it can have an effect on the HTML (along with the CSS, and anything else on the page).
    
4.  Add this code to your `scripts/main.js` file:
    
        const myHeading = document.querySelector("h1");
        myHeading.textContent = "Hello world!";
        
    
5.  Make sure the HTML and JavaScript files are saved, then load `index.html` in your browser. You should see something like this:
    

![Heading "hello world" above a firefox logo](https://developer.mozilla.org/en-US/docs/Learn_web_development/Getting_started/Your_first_website/Adding_interactivity/hello-world.png)

**Note:** The reason the above instructions place the `<script>` element near the bottom of the HTML file is that **the browser reads code in the order it appears in the file**.

If the JavaScript loads first and it is supposed to affect the HTML that hasn't loaded yet, there could be problems. Placing JavaScript near the bottom of an HTML page is one way to accommodate this dependency.

### What happened?

We have used JavaScript to change the heading text to _Hello world!_. We did this by using a function called `querySelector()` to grab a reference to your heading, and then store it in a variable called `myHeading`. This is similar to what we did using CSS selectors. When you want to do something to an element, you need to select it first.

Following that, the code set the value of the `myHeading` variable's `textContent` property (which represents the content of the heading) to _Hello world!_.

**Note:** Both of the features you used in this exercise are parts of the Document Object Model (DOM) API, which has the capability to manipulate documents.

## Language basics crash course

To give you a better understanding of how JavaScript works, let's explain some of the core features of the language. It's worth noting that these features are common to all programming languages. If you master these fundamentals, you have a head start on coding in other languages too!

**Warning:** In this article, try entering the example code lines into your JavaScript console to see what happens. For more details on JavaScript consoles, see Discover browser developer tools.

### Variables

Variables are containers that store values. You start by declaring a variable with the `let` keyword, followed by the name you give to the variable:

    let myVariable;
    

A semicolon at the end of a line indicates where a statement ends. It is only required when you need to separate statements on a single line. However, some people believe it's good practice to have semicolons at the end of each statement. There are other rules for when you should and shouldn't use semicolons. For more details, see Your Guide to Semicolons in JavaScript.

You can name a variable nearly anything, but there are some restrictions. (See this section about naming rules.) If you are unsure, you can check your variable name to see if it's valid.

JavaScript is case sensitive. This means `myVariable` is not the same as `myvariable`. If you have problems in your code, check the case!

After declaring a variable, you can give it a value:

    myVariable = "Bob";
    

Also, you can do both these operations on the same line:

    let myVariable = "Bob";
    

You retrieve the value by calling the variable name:

    myVariable;
    

After assigning a value to a variable, you can change it later in the code:

    let myVariable = "Bob";
    myVariable = "Steve";
    

Note that variables may hold values that have different data types:

| Variable | Explanation | Example |
| --- | --- | --- |
| String | This is a sequence of text known as a string. To signify that the value is a string, enclose it in single or double quote marks. | `let myVariable = 'Bob';` or  
`let myVariable = "Bob";` |
| Number | This is a number. Numbers don't have quotes around them. | `let myVariable = 10;` |
| Boolean | This is a True/False value. The words `true` and `false` are special keywords that don't need quote marks. | `let myVariable = true;` |
| Array | This is a structure that allows you to store multiple values in a single reference. | `let myVariable = [1,'Bob','Steve',10];`  
Refer to each member of the array like this:  
`myVariable[0]`, `myVariable[1]`, etc. |
| Object | This can be anything. Everything in JavaScript is an object and can be stored in a variable. Keep this in mind as you learn. | `let myVariable = document.querySelector('h1');`  
All of the above examples too. |

So why do we need variables? Variables are necessary to do anything interesting in programming. If values couldn't change, then you couldn't do anything dynamic, like personalize a greeting message or change an image displayed in an image gallery.

Comments are snippets of text that can be added along with code. The browser ignores text marked as comments. You can write comments in JavaScript just as you can in CSS:

    /*
    Everything in between is a comment.
    */
    

If your comment contains no line breaks, you can put it behind two slashes like this:

    // This is a comment
    

### Operators

An `operator` is a mathematical symbol that produces a result based on two values (or variables). In the following table, you can see some of the simplest operators, along with some examples to try in the JavaScript console.

| Operator | Explanation | Symbol(s) | Example |
| --- | --- | --- | --- |
| Addition | Add two numbers together or combine two strings. | `+` | `6 + 9;   'Hello ' + 'world!';` |
| Subtraction, Multiplication, Division | These do what you'd expect them to do in basic math. | `-`, `*`, `/` | `9 - 3;   8 * 2; // multiply in JS is an asterisk   9 / 3;` |
| Assignment | As you've seen already: this assigns a value to a variable. | `=` | `let myVariable = 'Bob';` |
| Strict equality | This performs a test to see if two values are equal and of the same data type. It returns a `true`/`false` (Boolean) result. | `===` | `let myVariable = 3;   myVariable === 4;` |
| Not, Does-not-equal | This returns the logically opposite value of what it precedes. It turns a `true` into a `false`, etc.. When it is used alongside the Equality operator, the negation operator tests whether two values are _not_ equal. | `!`, `!==` | 
For "Not", the basic expression is `true`, but the comparison returns `false` because we negate it:

`let myVariable = 3;   !(myVariable === 3);`

"Does-not-equal" gives basically the same result with different syntax. Here we are testing "is `myVariable` NOT equal to 3". This returns `false` because `myVariable` IS equal to 3:

`let myVariable = 3;   myVariable !== 3;`

 |

There are a lot more operators to explore, but this is enough for now. See Expressions and operators for a complete list.

**Note:** Mixing data types can lead to some strange results when performing calculations. Be careful that you are referring to your variables correctly, and getting the results you expect. For example, enter `'35' + '25'` into your console. Why don't you get the result you expected? Because the quote marks turn the numbers into strings, so you've ended up concatenating strings rather than adding numbers. If you enter `35 + 25` you'll get the total of the two numbers.

### Conditionals

Conditionals are code structures used to test if an expression returns true or not. A very common form of conditionals is the `if...else` statement. For example:

    let iceCream = "chocolate";
    if (iceCream === "chocolate") {
      alert("Yay, I love chocolate ice cream!");
    } else {
      alert("Awwww, but chocolate is my favorite…");
    }
    

The expression inside the `if ()` is the test. This uses the strict equality operator (as described above) to compare the variable `iceCream` with the string `chocolate` to see if the two are equal. If this comparison returns `true`, the first block of code runs. If the comparison is not true, the second block of code—after the `else` keyword—runs instead.

### Functions

Functions are a way of packaging functionality that you wish to reuse. It's possible to define a body of code as a function that executes when you call the function name in your code. This is a good alternative to repeatedly writing the same code. You have already seen some uses of functions. For example:

    let myVariable = document.querySelector("h1");
    

    alert("hello!");
    

The `document.querySelector()` and `alert()` functions are built into the browser.

If you see something which looks like a variable name, but it's followed by parentheses — `()` — it is likely to be a function. Functions often take arguments: bits of data they need to do their job. Arguments go inside the parentheses, separated by commas if there is more than one argument.

For example, the `alert()` function makes a pop-up box appear inside the browser window, but we need to give it a string as an argument to tell the function what message to display.

You can also define your own functions. In the next example, we create a simple function which takes two numbers as arguments and multiplies them:

    function multiply(num1, num2) {
      let result = num1 * num2;
      return result;
    }
    

Try running this in the console; then test with several arguments. For example:

    multiply(4, 7);
    multiply(20, 20);
    multiply(0.5, 3);
    

**Note:** The `return` statement tells the browser to return the `result` variable out of the function so it is available to use. This is necessary because variables defined inside functions are only available inside those functions. This is called variable scoping. (Read more about variable scoping.)

### Events

Real interactivity on a website requires event handlers. These are code structures that listen for activity in the browser, and run code in response. The most obvious example is handling the click event, which is fired by the browser when you click on something with your mouse. To demonstrate this, enter the following into your console, then click on the current webpage:

    document.querySelector("html").addEventListener("click", function () {
      alert("Ouch! Stop poking me!");
    });
    

There are a number of ways to attach an event handler to an element. Here we select the `<html>` element. We then call its `addEventListener()` function, passing in the name of the event to listen for (`'click'`) and a function to run when the event happens.

The function we just passed to `addEventListener()` here is called an _anonymous function_, because it doesn't have a name. There's an alternative way of writing anonymous functions, which we call an _arrow function_. An arrow function uses `() =>` instead of `function ()`:

    document.querySelector("html").addEventListener("click", () => {
      alert("Ouch! Stop poking me!");
    });
    

## Supercharging our example website

With our review of JavaScript basics completed, let's add some new features to our example site.

Before going any further, delete the current contents of your `main.js` file — the bit you added earlier during the "Hello world!" example — and save the empty file. If you don't, the existing code will clash with the new code you are about to add.

### Adding an image changer

In this section, you will learn how to use JavaScript and DOM API features to alternate the display between two images. This change will happen as a user clicks the displayed image.

1.  Choose another image to feature on your example site. Ideally, the image will be the same size as the image you added previously, or as close as possible.
    
2.  Save this image in your `images` folder.
    
3.  Add the following JavaScript code to your `main.js` file, making sure to replace `firefox2.png` and both instances of `firefox-icon.png` with your second and first image names, respectively.
    
        const myImage = document.querySelector("img");
        
        myImage.addEventListener("click", () => {
          const mySrc = myImage.getAttribute("src");
          if (mySrc === "images/firefox-icon.png") {
            myImage.setAttribute("src", "images/firefox2.png");
          } else {
            myImage.setAttribute("src", "images/firefox-icon.png");
          }
        });
        
    
4.  Save all files and load `index.html` in the browser. Now when you click the image, it should change to the other one.
    

In the above code, you stored a reference to your `<img>` element in `myImage`. Next, you gave it a `click` event handler function with no name (an "anonymous" function). Every time this element is clicked, the function:

1.  Retrieves the value of the image's `src` attribute.
    
2.  Uses a conditional to check if the `src` value is equal to the path of the original image:
    
    1.  If it is, the code changes the `src` value to the path of the second image, forcing the other image to be loaded inside the `<img>` element.
    2.  If it isn't (meaning it must already have changed), the `src` value swaps back to the original image path.

### Adding a personalized welcome message

Next, let's change the page heading to a personalized welcome message when the user first visits the site. This welcome message will persist. Should the user leave the site and return later, we will save the message using the Web Storage API. We will also include an option to change the username, and therefore, the welcome message.

1.  In `index.html`, add the following line just before the `<script>` element:
    
        <button>Change user</button>
        
    
2.  In `main.js`, place the following code at the bottom of the file, exactly as it is written. This creates references to the new button and the heading, storing each inside variables:
    
        let myButton = document.querySelector("button");
        let myHeading = document.querySelector("h1");
        
    
3.  Add the following function to set the personalized greeting. This won't do anything yet; we will call the function later on.
    
        function setUserName() {
          const myName = prompt("Please enter your name.");
          localStorage.setItem("name", myName);
          myHeading.textContent = `Mozilla is cool, ${myName}`;
        }
        
    
    The `setUserName()` function contains a `prompt()` function, which displays a dialog box, similar to `alert()`. This `prompt()` function does more than `alert()`, asking the user to enter data, and storing it in a variable after the user clicks _OK_. In this case, we are asking the user to enter a name. Next, the code calls on the `localStorage` API, which allows us to store data in the browser and retrieve it later. We use localStorage's `setItem()` function to create and store a data item called `"name"`, setting its value to the `myName` variable which contains the user's entry for the name. Finally, we set the `textContent` of the heading to a string, plus the user's newly stored name.
    
4.  Add the following condition block after the function declaration. We could call this initialization code, as it structures the app when it first loads.
    
        if (!localStorage.getItem("name")) {
          setUserName();
        } else {
          const storedName = localStorage.getItem("name");
          myHeading.textContent = `Mozilla is cool, ${storedName}`;
        }
        
    
    This first line of this block uses the negation operator (logical NOT, represented by the `!`) to check whether the `name` data item is already stored in in localStorage. If not, the `setUserName()` function runs to create it. If it exists (that is, the user set a user name during a previous visit), we retrieve the stored name using `getItem()` and set the `textContent` of the heading to a string, plus the user's name, as we did inside `setUserName()`.
    
5.  Add a `click` event handler function to the button, as shown below. When clicked, `setUserName()` runs. This allows the user to enter a different name by pressing the button.
    
        myButton.addEventListener("click", () => {
          setUserName();
        });
        
    

### A user name of null?

When you run the example and get the dialog box that prompts you to enter your user name, try pressing the _Cancel_ button. You should end up with a title that reads _Mozilla is cool, null_. This happens because the value is set as `null` when you cancel the prompt. _null_ is a special value in JavaScript that refers to the absence of a value.

Also, try clicking _OK_ without entering a name. You should end up with a title that reads _Mozilla is cool,_ because you've set `myName` to an empty string.

To avoid these problems, you could check that the user hasn't entered a blank name. Update your `setUserName()` function to this:

    function setUserName() {
      const myName = prompt("Please enter your name.");
      if (!myName) {
        setUserName();
      } else {
        localStorage.setItem("name", myName);
        myHeading.textContent = `Mozilla is cool, ${myName}`;
      }
    }
    

In human language, this means: If `myName` has no value, run `setUserName()` again from the start. If it does have a value (if the above statement is not true), then store the value in `localStorage` and set it as the heading's text.

## Conclusion

If you have followed all the instructions in this article, you should end up with a page that looks something like the image below. You can also view our version.

![Final look of HTML page after creating elements: a header, large centered logo, content, and a button](https://developer.mozilla.org/en-US/docs/Learn_web_development/Getting_started/Your_first_website/Adding_interactivity/website-screen-scripted.png)

If you get stuck, you can compare your work with our finished example code on GitHub.

Now that you've finished creating your website, the next step is to get it online so that others can check it out. We'll show you how to do so in our next article — Publishing your website.

## See also

Dynamic scripting with JavaScript

We have just scratched the surface of JavaScript in this article. You'll find a lot more JavaScript later on in our learning pathway, starting with our _Dynamic scripting with JavaScript_ module.

Learn JavaScript

This is an excellent resource for aspiring web developers! Learn JavaScript in an interactive environment, with short lessons and interactive tests, guided by an automated assessment. The first 40 lessons are free. The complete course is available for a small one-time payment.

*   Previous
*   Overview: Your first website
*   Next

---

## Page: https://developer.mozilla.org/en-US/docs/Learn_web_development/Getting_started/Your_first_website/Publishing_your_website

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