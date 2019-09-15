export interface Shape {
  draw(): void
  x: number
  y: number
  color: string
  lineWidth: number
}

export class Circle implements Shape {
  public x: number = 0
  public y: number = 0
  public radius: number = 10
  public lineWidth: number = 2
  public color: string = "red"
  private ctx: CanvasRenderingContext2D

  constructor(
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    radius: number,
    lineWidth: number = 2,
    color: string = "red"
  ) {
    this.ctx = ctx
    this.x = x
    this.y = y
    this.radius = radius
    this.lineWidth = lineWidth
    this.color = color
  }

  public draw = () => {
    this.ctx.save()
    this.ctx.beginPath()
    this.ctx.strokeStyle = this.color
    this.ctx.lineWidth = this.lineWidth
    this.ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI)
    this.ctx.stroke()
    this.ctx.restore()
  }
}

export class Rectangle implements Shape {
  public x: number
  public y: number
  public width: number
  public height: number
  public lineWidth: number
  public color: string
  private ctx: CanvasRenderingContext2D

  constructor(
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    width: number = 100,
    height: number = 100,
    lineWidth: number = 2,
    color: string = "red"
  ) {
    this.ctx = ctx
    this.x = x
    this.y = y
    this.width = width
    this.height = height
    this.lineWidth = lineWidth
    this.color = color
  }

  public draw = () => {
    this.ctx.save()
    this.ctx.beginPath()
    this.ctx.strokeStyle = this.color
    this.ctx.lineWidth = this.lineWidth
    this.ctx.rect(this.x, this.y, this.width, this.height)
    this.ctx.stroke()
    this.ctx.restore()
  }
}

export class Point {
  public x: number = 0
  public y: number = 0
  constructor(x: number = 0, y: number = 0) {
    this.x = x
    this.y = y
  }
}
