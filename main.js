class Pixel {
    constructor(ctx){
        this.ctx = ctx;
        this.canvas = ctx.canvas;
        this.width = this.canvas.width;
        this.height = this.canvas.height;
        this.center= {x: this.width/2, y: this.height/2};
        if (!ctx) {
            console.error('⚠ No canvas context found - CTX is missing');

        }
        else {
            console.log('🎨 Welcome to pixel library');
        }

    }

    clear() {
        this.ctx.clearRect(0, 0, this.width, this.height);
    }
    drawLine(startX, startY, endX, endY, color, lineWidth = 1) {
        this.ctx.beginPath();
        this.ctx.moveTo(startX, startY);
        this.ctx.lineTo(endX, endY);
        this.ctx.strokeStyle = color;
        this.ctx.lineWidth = lineWidth;
        this.ctx.stroke();
    }
    /**
   * Marks the center of the canvas with an X
   * 
   * This method draws an X at the exact center of the canvas. It's useful for:
   * - Debugging: Quickly identifying the center point of your canvas
   * - Layout: Helping align other elements relative to the center
   * - Testing: Verifying that your canvas dimensions are set correctly
   * 
   * @param {string} [color='red'] - The color of the X. Can be any valid CSS color string.
   * @param {number} [size=20] - The size of the X in pixels. This is the length of each line of the X.
   * 
   * @example
   * // Mark the center with a default red X
   * canvasLib.markCenter();
   * 
   * @example
   * // Mark the center with a blue X that's 40 pixels in size
   * canvasLib.markCenter('blue', 40);
   */
    markCenter(color = 'red', size = 20) {
        const centerX = this.canvas.width / 2;
        const centerY = this.canvas.height / 2;
        const halfSize = size / 2;
    
        this.drawLine(centerX - halfSize, centerY - halfSize, centerX + halfSize, centerY + halfSize, color, 2);
        this.drawLine(centerX - halfSize, centerY + halfSize, centerX + halfSize, centerY - halfSize, color, 2);
    }

     /**
   * Draws an equilateral triangle on the canvas
   * 
   * This method draws an equilateral triangle with its center at the specified coordinates.
   * The triangle is drawn with its point facing upwards by default.
   * 
   * @param {number} centerX - The x-coordinate of the triangle's center
   * @param {number} centerY - The y-coordinate of the triangle's center
   * @param {number} size - The length of each side of the triangle
   * @param {string} [color='black'] - The color of the triangle's outline. Can be any valid CSS color string.
   * @param {number} [lineWidth=1] - The width of the triangle's outline in pixels
   * 
   * @example
   * // Draw a black triangle with side length 100 at (150, 150)
   * canvasLib.drawTriangle(150, 150, 100);
   * 
   * @example
   * // Draw a blue triangle with side length 80 and line width 3 at (200, 200)
   * canvasLib.drawTriangle(200, 200, 80, 'blue', 3);
   */
  drawTriangle(centerX, centerY, size, color = 'black', lineWidth = 1) {
    this.ctx.beginPath();
    this.ctx.strokeStyle = color;
    this.ctx.lineWidth = lineWidth;

    // Calculate the height of the equilateral triangle
    const height = (Math.sqrt(3) / 2) * size;

    // Calculate the coordinates of the three points of the triangle
    const topX = centerX;
    const topY = centerY - (2/3) * height;
    const leftX = centerX - size / 2;
    const leftY = centerY + (1/3) * height;
    const rightX = centerX + size / 2;
    const rightY = centerY + (1/3) * height;

    // Draw the triangle
    this.ctx.moveTo(topX, topY);
    this.ctx.lineTo(leftX, leftY);
    this.ctx.lineTo(rightX, rightY);
    this.ctx.closePath();
    this.ctx.stroke();
  }


  /**
   * Draws a circle on the canvas
   * 
   * This method draws a circle with its center at the specified coordinates.
   * The circle can be customized with different colors and line widths.
   * 
   * @param {number} centerX - The x-coordinate of the circle's center
   * @param {number} centerY - The y-coordinate of the circle's center
   * @param {number} radius - The radius of the circle in pixels
   * @param {string} [strokeColor='black'] - The color of the circle's outline. Can be any valid CSS color string.
   * @param {number} [lineWidth=1] - The width of the circle's outline in pixels
   * @param {string} [fillColor=''] - The fill color of the circle. If empty, the circle will not be filled.
   * 
   * @example
   * // Draw a black circle with radius 50 at (150, 150)
   * canvasLib.drawCircle(150, 150, 50);
   * 
   * @example
   * // Draw a blue circle with radius 30, line width 2, and yellow fill at (200, 200)
   * canvasLib.drawCircle(200, 200, 30, 'blue', 2, 'yellow');
   */
  drawCircle(centerX, centerY, radius, strokeColor = 'black', lineWidth = 1, fillColor = '') {
    this.ctx.beginPath();
    this.ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
    this.ctx.strokeStyle = strokeColor;
    this.ctx.lineWidth = lineWidth;
    this.ctx.stroke();
    
    if (fillColor) {
      this.ctx.fillStyle = fillColor;
      this.ctx.fill();
    }
  }


  /**
   * Draws a regular polygon on the canvas
   * 
   * This method draws a regular polygon with a specified number of sides.
   * The polygon is centered around the given coordinates.
   * 
   * @param {number} centerX - The x-coordinate of the polygon's center
   * @param {number} centerY - The y-coordinate of the polygon's center
   * @param {number} radius - The radius of the circumscribed circle
   * @param {number} sides - The number of sides of the polygon
   * @param {string} [strokeColor='black'] - The color of the polygon's outline
   * @param {number} [lineWidth=1] - The width of the polygon's outline
   * @param {string} [fillColor=''] - The fill color of the polygon. If empty, the polygon will not be filled.
   * @param {number} [rotation=0] - The rotation of the polygon in radians
   * 
   * @example
   * // Draw a red hexagon with radius 50 at (200, 200)
   * canvasLib.drawRegularPolygon(200, 200, 50, 6, 'red', 2, 'pink');
   * 
   * @example
   * // Draw a blue unfilled octagon with radius 70 at (300, 300), rotated by 45 degrees
   * canvasLib.drawRegularPolygon(300, 300, 70, 8, 'blue', 2, '', Math.PI / 4);
   */
  drawRegularPolygon(centerX, centerY, radius, sides, strokeColor = 'black', lineWidth = 1, fillColor = '', rotation = 0) {
    this.ctx.beginPath();
    this.ctx.strokeStyle = strokeColor;
    this.ctx.lineWidth = lineWidth;

    for (let i = 0; i < sides; i++) {
      const angle = rotation + (i * 2 * Math.PI / sides);
      const x = centerX + radius * Math.cos(angle);
      const y = centerY + radius * Math.sin(angle);
      
      if (i === 0) {
        this.ctx.moveTo(x, y);
      } else {
        this.ctx.lineTo(x, y);
      }
    }

    this.ctx.closePath();
    
    if (fillColor) {
      this.ctx.fillStyle = fillColor;
      this.ctx.fill();
    }
    
    this.ctx.stroke();
  }




  /**
   * Draws a star shape on the canvas
   * 
   * This method draws a star with a specified number of points.
   * The star is centered around the given coordinates.
   * 
   * @param {number} centerX - The x-coordinate of the star's center
   * @param {number} centerY - The y-coordinate of the star's center
   * @param {number} outerRadius - The radius from the center to the outer points of the star
   * @param {number} innerRadius - The radius from the center to the inner points of the star
   * @param {number} points - The number of points on the star
   * @param {string} [strokeColor='black'] - The color of the star's outline
   * @param {number} [lineWidth=1] - The width of the star's outline
   * @param {string} [fillColor=''] - The fill color of the star. If empty, the star will not be filled.
   * @param {number} [rotation=0] - The rotation of the star in radians
   * 
   * @example
   * // Draw a red 5-pointed star with radius 50 at (200, 200)
   * canvasLib.drawStar(200, 200, 50, 25, 5, 'red', 2, 'yellow');
   * 
   * @example
   * // Draw a blue unfilled 8-pointed star with radius 70 at (300, 300), rotated by 45 degrees
   * canvasLib.drawStar(300, 300, 70, 35, 8, 'blue', 2, '', Math.PI / 4);
   */
  drawStar(centerX, centerY, outerRadius, innerRadius, points, strokeColor = 'black', lineWidth = 1, fillColor = '', rotation = 0) {
    this.ctx.beginPath();
    this.ctx.strokeStyle = strokeColor;
    this.ctx.lineWidth = lineWidth;

    for (let i = 0; i < points * 2; i++) {
      const radius = i % 2 === 0 ? outerRadius : innerRadius;
      const angle = rotation + (i * Math.PI / points);
      const x = centerX + radius * Math.cos(angle);
      const y = centerY + radius * Math.sin(angle);
      
      if (i === 0) {
        this.ctx.moveTo(x, y);
      } else {
        this.ctx.lineTo(x, y);
      }
    }

    this.ctx.closePath();
    
    if (fillColor) {
      this.ctx.fillStyle = fillColor;
      this.ctx.fill();
    }
    
    this.ctx.stroke();
  }


/**
   * Draws a heart shape on the canvas
   * 
   * This method draws a more traditional heart shape centered around the given coordinates.
   * 
   * @param {number} centerX - The x-coordinate of the heart's center
   * @param {number} centerY - The y-coordinate of the heart's center
   * @param {number} size - The size of the heart (width and height will be equal)
   * @param {string} [strokeColor='red'] - The color of the heart's outline
   * @param {number} [lineWidth=1] - The width of the heart's outline
   * @param {string} [fillColor=''] - The fill color of the heart. If empty, the heart will not be filled.
   * @param {number} [rotation=0] - The rotation of the heart in radians
   * 
   * @example
   * // Draw a red filled heart with size 100 at (200, 200)
   * canvasLib.drawHeart(200, 200, 100, 'red', 2, 'pink');
   * 
   * @example
   * // Draw a blue unfilled heart with size 80 at (300, 300), rotated by 45 degrees
   * canvasLib.drawHeart(300, 300, 80, 'blue', 2, '', Math.PI / 4);
   */
drawHeart(centerX, centerY, size, strokeColor = 'red', lineWidth = 1, fillColor = '', rotation = 0) {
    this.ctx.save();
    this.ctx.translate(centerX, centerY);
    this.ctx.rotate(rotation);
    this.ctx.scale(size / 100, size / 100);  // Normalize to a 100x100 coordinate system

    this.ctx.beginPath();
    this.ctx.moveTo(0, 30);
    this.ctx.bezierCurveTo(0, -10, -50, -40, -50, 5);
    this.ctx.bezierCurveTo(-50, 40, -20, 50, 0, 80);
    this.ctx.bezierCurveTo(20, 50, 50, 40, 50, 5);
    this.ctx.bezierCurveTo(50, -40, 0, -10, 0, 30);
    
    this.ctx.strokeStyle = strokeColor;
    this.ctx.lineWidth = lineWidth;
    
    if (fillColor) {
      this.ctx.fillStyle = fillColor;
      this.ctx.fill();
    }
    
    this.ctx.stroke();
    this.ctx.restore();
  }


/**
   * Draws text on the canvas with various styling options
   * 
   * @param {string} text - The text to be drawn
   * @param {number} x - The x-coordinate of the text position
   * @param {number} y - The y-coordinate of the text position
   * @param {Object} [options] - An object containing styling options
   * @param {string} [options.font='16px Arial'] - Font style string
   * @param {string} [options.color='black'] - Text color
   * @param {string} [options.align='start'] - Text alignment ('start', 'center', 'end')
   * @param {string} [options.baseline='alphabetic'] - Text baseline
   * @param {Object} [options.shadow] - Shadow options
   * @param {string} [options.shadow.color='rgba(0,0,0,0.5)'] - Shadow color
   * @param {number} [options.shadow.blur=4] - Shadow blur
   * @param {number} [options.shadow.offsetX=2] - Shadow X offset
   * @param {number} [options.shadow.offsetY=2] - Shadow Y offset
   * @param {Object} [options.outline] - Outline options
   * @param {string} [options.outline.color='black'] - Outline color
   * @param {number} [options.outline.width=1] - Outline width
   * @param {Object} [options.gradient] - Gradient options
   * @param {string[]} [options.gradient.colors=['black', 'white']] - Gradient colors
   * @param {string} [options.gradient.direction='horizontal'] - Gradient direction ('horizontal' or 'vertical')
   * 
   * @example
   * // Simple text
   * canvasLib.drawText('Hello World', 100, 100);
   * 
   * @example
   * // Styled text with shadow
   * canvasLib.drawText('Fancy Text', 100, 200, {
   *   font: 'bold 24px Arial',
   *   color: 'blue',
   *   align: 'center',
   *   shadow: { color: 'rgba(0,0,0,0.5)', blur: 5, offsetX: 3, offsetY: 3 }
   * });
   * 
   * @example
   * // Outlined text with gradient
   * canvasLib.drawText('Gradient Text', 100, 300, {
   *   font: '32px Arial',
   *   outline: { color: 'black', width: 2 },
   *   gradient: { colors: ['red', 'yellow', 'blue'], direction: 'vertical' }
   * });
   */
drawText(text, x, y, options = {}) {
    const {
      font = '16px Arial',
      color = 'black',
      align = 'start',
      baseline = 'alphabetic',
      shadow = null,
      outline = null,
      gradient = null
    } = options;

    this.ctx.save();

    // Set basic text properties
    this.ctx.font = font;
    this.ctx.textAlign = align;
    this.ctx.textBaseline = baseline;

    // Apply shadow if specified
    if (shadow) {
      this.ctx.shadowColor = shadow.color || 'rgba(0,0,0,0.5)';
      this.ctx.shadowBlur = shadow.blur || 4;
      this.ctx.shadowOffsetX = shadow.offsetX || 2;
      this.ctx.shadowOffsetY = shadow.offsetY || 2;
    }

    // Create gradient if specified
    let fillStyle = color;
    if (gradient) {
      const gradientObj = gradient.direction === 'vertical'
        ? this.ctx.createLinearGradient(x, y, x, y + parseInt(font))
        : this.ctx.createLinearGradient(x, y, x + this.ctx.measureText(text).width, y);
      
      gradient.colors.forEach((color, index) => {
        gradientObj.addColorStop(index / (gradient.colors.length - 1), color);
      });
      fillStyle = gradientObj;
    }

    // Draw outline if specified
    if (outline) {
      this.ctx.strokeStyle = outline.color || 'black';
      this.ctx.lineWidth = outline.width || 1;
      this.ctx.strokeText(text, x, y);
    }

    // Draw filled text
    this.ctx.fillStyle = fillStyle;
    this.ctx.fillText(text, x, y);

    this.ctx.restore();
  }

}