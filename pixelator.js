/**
 * Pixelator is an open source library that allows you to
 * generate a HTML-only image from an image format (PNG, JPEG etc).
 * 
 * @version     1.0
 * @author      Gecko
 * @git-source  https://github.com/g3x0/pixelator/
 */

function Pixelator(){}
Pixelator.prototype = {
    getImageData: function (image)
    {
        var canvas = document.createElement('canvas');
        canvas.width = image.width;
        canvas.height = image.height;

        var context = canvas.getContext('2d');
        context.drawImage(image, 0, 0);

        return context.getImageData(0, 0, image.width, image.height);
    },
    getPixel: function (imagedata, x, y)
    {
        var position = (x + imagedata.width * y) * 4, data = imagedata.data;
        return { r: data[position], g: data[position + 1], b: data[position + 2], a: data[position + 3] };
    },
    pixelate: function (o)
    {
        var res, type, color, width, height, pixarr, offset, imagedata, increments, finalWidth, finalHeight, targetSelector;
        var img = new Image();

        if (o['image'])
            img.src = o['image']
        else
        {
            console.log('Warning! You need to specify an image source via the "image" parameter.');
            return false;
        }
        
        if (o['target'])
            targetSelector = o['target']
        else
        {
            console.log('Warning! You need to specify a HTML element where you want to insert the processed image via the "target" parameter.');
            return false;
        }
        
        res = o['res'] ? o['res'] : false;
        
        if (res)
            width = parseInt(res);
        else
        {
            if (o['width'])
                width = parseInt(o['width']);
            else
                if (!o['height'])
                {
                    console.log('Warning! You need to specify a "res" or "width" value.');
                    return false;
                }
        }
        
        height = o['height'] ? parseInt(o['height']) : width;
        increments = {width: width, height: height};

        type = o['type'] ? o['type'] : false;
        source = o['source'] ? o['source'] : false;
        offset = o['offset'] ? o['offset'] : false;
        finalWidth = o['newWidth'] ? parseInt(o['newWidth']) : false;
        finalHeight = o['newHeight'] ? parseInt(o['newHeight']) : false;

        if (!width) width = height;

        if (type)
        {
            switch (type)
            {
                case 'v':
                case 'vertical':
                    document.querySelector(targetSelector).style.height = (finalHeight ? finalHeight : img.height) + 'px';

                    for (var i = 0; i < img.width; i += increments['height'])
                    {
                        width = (i + width > img.width) ? img.width - (i - increments['height'] + width) : width;

                        imagedata = this.getImageData(img);
                        color = this.getPixel(imagedata, i, offset ? offset : 0);

                        pixarr = document.createElement('div');
                        pixarr.innerHTML = '';
                        pixarr.style.width = width + 'px';
                        pixarr.style.height = '100%';
                        pixarr.style.display = 'inline-block';
                        pixarr.style.background = 'rgba('+ color['r'] +','+ color['g'] +','+ color['b'] +','+ color['a'] +')';
                        pixarr.style.overflow = 'hidden';
                        document.querySelector(targetSelector).appendChild(pixarr);
                    }
                    break;

                case 'h':
                case 'horizontal':
                    document.querySelector(targetSelector).style.width = (finalWidth ? finalWidth : img.width) + 'px';

                    for (var i = 0; i < img.height; i += increments['height'])
                    {
                        height = (i + height > img.height) ? img.height - (i - increments['height'] + height) : height;

                        imagedata = this.getImageData(img);
                        color = this.getPixel(imagedata, offset ? offset : 0, i);

                        pixarr = document.createElement('div');
                        pixarr.innerHTML = '';
                        pixarr.style.width = '100%';
                        pixarr.style.height = width + 'px';
                        pixarr.style.display = 'inline-block';
                        pixarr.style.background = 'rgba('+ color['r'] +','+ color['g'] +','+ color['b'] +','+ color['a'] +')';
                        pixarr.style.overflow = 'hidden';
                        document.querySelector(targetSelector).appendChild(pixarr);

                        pixarr = document.createElement('div');
                        pixarr.style.clear = 'both';
                        document.querySelector(targetSelector).appendChild(pixarr);
                    }
                    break;
            }
        }
        else
        {
            for (var i = 0; i < img.height; i += increments['height'])
            {
                height = (i + height > img.height) ? img.height - (i - increments['height'] + height) : height;
                
                for (var j = 0; j < img.width; j += increments['width'])
                {
                    width = (j + width > img.width) ? img.width - (j - increments['width'] + width) : width;

                    imagedata = this.getImageData(img);
                    color = this.getPixel(imagedata, j, i);

                    pixarr = document.createElement('div');
                    pixarr.innerHTML = '';
                    pixarr.style.width = width + 'px';
                    pixarr.style.height = (height ? height : width) + 'px';
                    pixarr.style.display = 'inline-block';
                    pixarr.style.background = 'rgba('+ color['r'] +','+ color['g'] +','+ color['b'] +','+ color['a'] +')';
                    pixarr.style.overflow = 'hidden';
                    document.querySelector(targetSelector).appendChild(pixarr);
                }

                width = increments['width'];
                pixarr = document.createElement('div');
                pixarr.style.clear = 'both';
                document.querySelector(targetSelector).appendChild(pixarr);
            }
        }

        if (source)
        {
            var source = document.createElement('p');
            source.innerHTML = 'Source code: ';
            document.querySelector(targetSelector).parentNode.appendChild(source);
            
            var sourceContent = '';
            var tagName = document.querySelector(targetSelector).tagName.toLowerCase();
            var foo = document.querySelector(targetSelector), attrs = foo.attributes, i = attrs.length;

            while (i--) sourceContent += ' '+ attrs[i].name + '="' + attrs[i].value + '"';
            
            source = document.createElement('textarea');
            sourceContent = '<'+ tagName + sourceContent + '>' + document.querySelector(targetSelector).innerHTML +'</'+ tagName +'>';
            
            source.innerHTML = sourceContent;
            source.style.width = document.querySelector(targetSelector).offsetWidth + 'px';
            source.style.height = '100px';
            source.style.clear = 'both';
            document.querySelector(targetSelector).parentNode.appendChild(source);
        }

        return 0;
    }
}
