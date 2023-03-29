
# lambda emailer (nodejs)
The goal of this repo is to generate dynamic email content from input data.

***Note - For the sake of simplicity, we are not using AWS SDK or other AWS services here.  We are reading local input data and writing the generated output html in local directory. You can use other AWS services like S3 to read or write data, or get the input data through http request, SQS and so on. Also note that we are not using any mail providers.***

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
**Note** 

We can replace the list objects in mjml templates with the help of [handlerbar block helpers](https://handlebarsjs.com/guide/block-helpers.html) but sometimes it disturbs the layout.  In such case, we need to do it directly in handlerbars with the help of [handlerbar block helpers](https://handlebarsjs.com/guide/block-helpers.html). Apart from inbuilt helpers, there are some userful helpers in `src/generate_email`.

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
