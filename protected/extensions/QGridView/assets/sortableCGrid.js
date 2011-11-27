(function($)
{
    $.widget('CmsUI.sortableGrid', $.CmsUI.gridBase, {
        _version:0.1,

        // default options
        options:{
            menuBlock:null,
            offsetX:8,
            offsetY:8,
            speed:'fast'
        },
        parent:function()
        {
            return $.CmsUI.gridBase.prototype;
        },
        _create:function()
        {
            this.parent()._create.call(this);
        },
        _initHandlers:function()
        {
            this.parent()._initHandlers.call(this);

            var self = this;
            self._initSortable();
        },
        _initSortable:function()
        {
            var self = this,
                options = self.options,
                id = options.id,
                table = self.element.find('tbody:first');

            table.sortable({
                axis:"y",
                containment:"parent",
                cursor:"pointer",
                items:'tr',
                delay:100,
                distance:5,
                handle:".positioner",
                forcePlaceholderSize:true,
                forceHelperSize:true,
                tolerance:"pointer",
                update:function(event, ui)
                {
                    var arr = [];
                    var elems = $("tr .pk", table);
                    $.each(elems, function(key)
                    {
                        arr[key] = $(this).attr('id').split('_')[1];
                    });
                    $.ajax({
                        url:options.url,
                        type:"POST",
                        data:({pk:arr, model:options.model}),
                        dataType:"json"
                    });
                }
            }).disableSelection();
        }
    });

})(jQuery);