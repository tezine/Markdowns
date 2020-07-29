# Boostrap



## Flex layout

* css class `row` is a flex layout in boostrap, so if you wish to position a button on the right side, use `ml-auto mr-3`:

```html
    <div class="container">
        <div class="row">
            <v-text-field
                    class="col-md-12"
                    label="E-mail"
            ></v-text-field>
        </div>
        <div class="row">
            <v-text-field
                    class="col-md-12"
                    label="Password"
            ></v-text-field>
        </div>
        <div class="row">
            <v-btn small color="primary" class="ml-auto mr-3" @click="onBtnEnterClicked">Enter</v-btn>
        </div>
    </div>
```



