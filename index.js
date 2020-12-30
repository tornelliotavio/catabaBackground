//hellow m4
const fs = require("fs");
const Canvas = require("canvas");
function linearColorToRGBA(rgba) {

    let FloatR = clamp(rgba.r ? rgba.r : rgba.R, 0, 1)
    let FloatG = clamp(rgba.g ? rgba.g : rgba.G, 0, 1)
    let FloatB = clamp(rgba.b ? rgba.b : rgba.B, 0, 1)
    let FloatA = clamp(rgba.a ? rgba.a : rgba.A, 0, 1)

    FloatR = FloatR <= 0.0031308 ? FloatR * 12.92 : Math.pow(FloatR, 1 / 2.4) * 1.055 - 0.055
    FloatG = FloatG <= 0.0031308 ? FloatG * 12.92 : Math.pow(FloatG, 1 / 2.4) * 1.055 - 0.055
    FloatB = FloatB <= 0.0031308 ? FloatB * 12.92 : Math.pow(FloatB, 1 / 2.4) * 1.055 - 0.055

    let Result = {}

    Result.a = Math.floor(FloatA * 255.999)
    Result.r = Math.floor(FloatR * 255.999)
    Result.g = Math.floor(FloatG * 255.999)
    Result.b = Math.floor(FloatB * 255.999)

    return Result

}
async function main() {

    const MIInfo = (JSON.parse(await fs.readFileSync("./files/MI_CID_220_F_Clown.json")))[0]

    let export_type = MIInfo.export_type
    let Parent = MIInfo.Parent

    let ScalarParameterValues = {
        ZoomImage_Percent: MIInfo.ScalarParameterValues.filter(p => { return p.ParameterInfo.Name === "ZoomImage_Percent" })[0],
        RefractionDepthBias: MIInfo.ScalarParameterValues.filter(p => { return p.ParameterInfo.Name === "RefractionDepthBias" })[0],
    }

    let VectorParameterValues = {
        Background_Color_A: MIInfo.VectorParameterValues.filter(p => { return p.ParameterInfo.Name === "Background_Color_A" })[0],
        Background_Color_B: MIInfo.VectorParameterValues.filter(p => { return p.ParameterInfo.Name === "Background_Color_B" })[0],
        FallOff_Color: MIInfo.VectorParameterValues.filter(p => { return p.ParameterInfo.Name === "FallOff_Color" })[0],
    }
    let TextureParameterValues = {
        OfferImage: MIInfo.TextureParameterValues.filter(p => { return p.ParameterInfo.Name === "OfferImage" })[0],
    }
    let BasePropertyOverrides = MIInfo.BasePropertyOverrides

    let ZoomImage_Percent = 40.0
    let RefractionDepthBias = 0.0
    let Gradient_Hardness = 16.0
    let Gradient_Position_X = 42.558815
    let Gradient_Position_Y = 67.54324
    let Gradient_Position_ConvertNumber = 0.2
    let Gradient_Size = 83.0
    let Spotlight_Intensity = 100.0
    let Spotlight_Position_X = 53.88757
    let Spotlight_Position_Y = 32.491215
    let Spotlight_Size = 103.15944
    let FallOffColor_Fill_Percent = 45.0
    let FallOffColor_Postion = 55.0
    let OffsetImage_X = 0.0
    let OffsetImage_Y = 0.0

    // console.log(ScalarParameterValues)
    // console.log(VectorParameterValues)
    // console.log(TextureParameterValues)
    // console.log(BasePropertyOverrides)
    let imageX = 318
    // let imageY = 551 / 2 - 25 / 2
    let imageY = 551

    const canvas = Canvas.createCanvas(imageX, imageY)
    const ctx = canvas.getContext("2d")
    const itemImage = await Canvas.loadImage("./files/" + TextureParameterValues.OfferImage.ParameterValue[0] + ".png").catch((err) => { return null; });
    if (itemImage) {
        let minus = imageY - itemImage.height
        let width = itemImage.width + minus
        let height = itemImage.height + minus
        let x = -width / 2 + imageX / 2


        let grd = ctx.createRadialGradient()


        ctx.fillStyle = grd;
        ctx.fillRect(0, 0, imageX, imageY)

        ctx.save();
        ctx.translate(imageX / 2, 0);
        ctx.scale(0.978 + ScalarParameterValues.ZoomImage_Percent.ParameterValue / 200, 0.978 + ScalarParameterValues.ZoomImage_Percent.ParameterValue / 200)
        ctx.drawImage(itemImage, x - imageX / 2, -2, width, height);
        ctx.restore();
    };

    await fs.writeFileSync("./output.png", canvas.toBuffer())

}


main()