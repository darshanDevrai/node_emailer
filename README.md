
# lambda emailer (nodejs)

# how it works 

**MJML -> HTML -> handlerbars -> embed dynamic content -> final html output**

## prepare a template

1. Write your email template with [mjml](https://mjml.io/). [desktop app](http://mjmlio.github.io/mjml-app/) e.g - 
```
<mjml>
  <mj-body>
    <mj-section>
      <mj-column>

        <mj-divider border-color="#F45E43"></mj-divider>

        <mj-text font-size="20px" color="#F45E43" font-family="helvetica">Hello Luke Skywalker</mj-text>

      </mj-column>
    </mj-section>
  </mj-body>
</mjml>
```
2. Once the layout is done then decide the dynamic content in the template.
3. Define the input object data structure. Example - 
```
{
    "user": {
        "firstname" : "Luke",
        "lastname" : "skywalker"
    },
    "otherData" : {
        "key" : "value"
    }
}
```
4. Replace the dynamic content from the mjml template with variable names as described in [handlerbars](https://handlebarsjs.com/). Example - 

```
<mjml>
  <mj-body>
    <mj-section>
      <mj-column>

        <mj-divider border-color="#F45E43"></mj-divider>

        <mj-text font-size="20px" color="#F45E43" font-family="helvetica">Hello {{user.firstname }} {{user.lastname}}</mj-text>

      </mj-column>
    </mj-section>
  </mj-body>
</mjml>

```
** Note ** 
We can not replace the list objects in mjml templates as mjml does not support such operations. In such case we need to do it directly in handlerbars with the help of [handlerbar block helpers](https://handlebarsjs.com/guide/block-helpers.html). Apart from inbuilt helpers, there are some userful helpers in `src/generate_email`.

5. Mjml gives html as an output. Get the output html from the mjml template. Write a new file in `templates/handlebars` folder and paste that html content from mjml.

6. Add dynamic content in handlerbars templates by using [handlerbar block helpers](https://handlebarsjs.com/guide/block-helpers.html).


## generate dynamic email template

Now we have a handlerbars template in `templates/handlebars` folder. We can generate dynamic email html template. 

In this repo for testing purpose, we are using input data from `data/userData.json` folder. In real scenarios, it will come from request payload. 

For testing purpose, We are writing the dynamic output html in the `output_html` folder.


## Installation and usage 

clone and run 

```
npm run install
```
While development and testing
```
npm run start
```
For prod 
```
npm run build
```
You will get the zip file in `dist` folder. 

Upload the zip in a lambda fn.