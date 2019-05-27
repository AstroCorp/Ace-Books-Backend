<script>
    export default
    {
        props: ['page', 'scale', 'scrollTop', 'clientHeight'],

        data()
        {
            return {
                elementTop: 0,
                elementHeight: 0,
            };
        },

        // Creamos un canvas con un nuevo atributo llamado canvasAttrs
        render(createElement)
        {
            const { canvasAttrs: attrs } = this;

            return createElement('canvas',
            {
                attrs
            });
        },

        // https://vuejs.org/v2/guide/instance.html
        // Se crea el componente, creamos el atributo viewport usando el valor del viewport de la página
        created()
        {
            // PDFPageProxy#getViewport
            // https://mozilla.github.io/pdf.js/api/draft/PDFPageProxy.html
            this.viewport = this.page.getViewport(this.scale);
        },

        // Tras crear el componente se monta
        mounted()
        {
            this.updateElementBounds();
        },

        // Antes de eliminar o reemplazar el componente se destruye
        beforeDestroy()
        {
            this.destroyPage(this.page);
        },

        computed:
        {
            // variables computadas

            canvasAttrs()
            {
                // Se obtiene el ancho y alto del viewport y de redondea a lo alto para quitar decimales
                let { width, height } = this.viewport;
                [width, height] = [width, height].map(dim => Math.ceil(dim));

                // Se obtiene la variable computada canvasStyle para asignarla a canvasAttrs como style
                const style = this.canvasStyle;

                return {
                    width,
                    height,
                    style,
                    class: 'pdf-page',
                };
            },

            canvasStyle()
            {
                // Se obtiene el ancho, alto y el ratio de aspecto en CSS, para evtar redibujados, todo esto usando un clon del viewport
                const { width: actualSizeWidth, height: actualSizeHeight } = this.actualSizeViewport;
                const pixelRatio = window.devicePixelRatio || 1;
                const [pixelWidth, pixelHeight] = [actualSizeWidth, actualSizeHeight].map(dim => Math.ceil(dim / pixelRatio));

                return `width: ${pixelWidth}px; height: ${pixelHeight}px;`;
            },

            // Clon del viewport
            actualSizeViewport()
            {
                return this.viewport.clone(
                {
                    scale: this.scale
                });
            },

            isElementVisible() 
            {
                const {elementTop, elementBottom, scrollTop, scrollBottom} = this;
                if (!elementBottom) return;
            
                return elementTop < scrollBottom && elementBottom > scrollTop;
            },
            
            elementBottom()
            {
                return this.elementTop + this.elementHeight;
            },
            
            scrollBottom()
            {
                return this.scrollTop + this.clientHeight;
            },
        },

        methods:
        {
            /*
                Cuando el canvas se monta, renderizamos la página utilizando el método PDFPageProxy#render.
                Necesita el viewport y canvasContext como argumentos. Como eso devuelve una promesa, podemos
                saber cuando se completa el dibujado.
            */
            drawPage()
            {
                if (this.renderTask) return;

                const { viewport } = this;
                const canvasContext = this.$el.getContext('2d');
                const renderContext = { canvasContext, viewport };

                // PDFPageProxy#render
                // https://mozilla.github.io/pdf.js/api/draft/PDFPageProxy.html
                this.renderTask = this.page.render(renderContext);
                this.renderTask.then(() => this.$emit('rendered', this.page));

                this.renderTask.then(/* */).catch(this.destroyRenderTask);
            },

            /*
                Si el render falla, la página es reemplazada o el componente es eliminado se ejecuta esto, para eliminar la página
                se usa el método destro() de pdf.js ya que esto escaba del control de vue.
            */
            destroyPage(page)
            {
              if (!page) return;

              // PDFPageProxy#_destroy
              // https://mozilla.github.io/pdf.js/api/draft/PDFPageProxy.html
              page._destroy();

              // RenderTask#cancel
              // https://mozilla.github.io/pdf.js/api/draft/RenderTask.html
              if (this.renderTask) this.renderTask.cancel();
            },

            destroyRenderTask()
            {
              if (!this.renderTask) return;

              // RenderTask#cancel
              // https://mozilla.github.io/pdf.js/api/draft/RenderTask.html
              this.renderTask.cancel();
              delete this.renderTask;
            },

            updateElementBounds()
            {
                const {offsetTop, offsetHeight} = this.$el;
                this.elementTop = offsetTop;
                this.elementHeight = offsetHeight;
            },
        },

        watch:
        {
            scale: 'updateElementBounds',
            scrollTop: 'updateElementBounds',
            clientHeight: 'updateElementBounds',

            page(page, oldPage)
            {
                this.destroyPage(oldPage);
            },

            isElementVisible(isElementVisible)
            {
                if (isElementVisible) this.drawPage();
            },
        },
    }

</script>
