PImage image;

HashMap<String, PShader> filters = new HashMap<String, PShader>();

//filters' file name to load and keys for filters and functions
String[] filterNames = {
    "polyline",
    "gamma",
    "sigmoid",
    "nega",
    "posterize",
    "solarize",
    "grayscale",
    "pseudocolor",
    "mean",
    "gaussian",
    "sobel",
    "prewittgradient",
    "sobelgradient",
    "laplacian",
    "log",
    "redblue",
    "zerocrossing",
    "sharpening",
    "bilateral",
    "median",
    "mosaic",
    "halftone",
    "grayscalered",
};

//gaussian filter radius
final int radius = 8;

void setup()
{
    size(1024, 768, P2D);
    image = loadImage("bigben.jpg");
    for (String filterName : filterNames) {
        filters.put(filterName, loadShader(filterName + ".frag"));
    }
}

void draw()
{
    //----- normalized mouseX and mouseY -----
    final float mX = (float)mouseX / (float)width;
    final float mY = 1 - (float)mouseY / (float)height;
    final boolean linear = !keyPressed;
    
    //----- magic numbers -----
    final float slope = pow(4., mY) - 1.;
    final float intercept = mY - slope*mX;
    final float gamma = pow(10., 1 - mY*2.);
    final float gain = mY * 20.;
    final float freq = pow(2., mY*4. - 1.);
    final float tone = pow(4., pow(5., pow(2., mY) - 1.) - 1.);
    final int radius = (height - mouseY) * 10 / height;
    final float gaussianSigma = mY * 4.;
    final float[] gaussianWeight = createGaussianWeight(gaussianSigma);
    final float logSigma = mY * 4.;
    final float[] logWeight = createLogWeight(logSigma);
    final float th = mX * 0.5;
    final float sharpness = pow(32., mY);
    final float bilateralSigma = mX * 0.2;
    final int period = (height - mouseY) * 10 / height + 1;
    final float mag = mX + 1.;
    
    filters.get("grayscale").set("linear", linear);
    filters.get("mean").set("linear", linear);
    filters.get("gaussian").set("linear", linear);
    filters.get("sigmoid").set("linear", linear);
    filters.get("bilateral").set("linear", linear);
    filters.get("sharpening").set("linear", linear);
    
    filters.get("polyline").set("slope", slope);
    filters.get("polyline").set("intercept", intercept);
    filters.get("gamma").set("gamma", gamma);
    filters.get("sigmoid").set("gain", gain);
    filters.get("solarize").set("freq", freq);
    filters.get("posterize").set("tone", tone);
    filters.get("mean").set("radius", radius);
    filters.get("gaussian").set("weight", gaussianWeight);
    filters.get("log").set("weight", logWeight);
    filters.get("zerocrossing").set("th", th);
    filters.get("sharpening").set("sharpness", sharpness);
    filters.get("bilateral").set("weight", gaussianWeight);
    filters.get("bilateral").set("sigma", bilateralSigma);
    filters.get("mosaic").set("period", period);
    filters.get("halftone").set("period", gaussianSigma * 2. + 4.);
    
    //values for drawing graph
    float[] curve = createIdentityLine(256);
    
    
    //----- draw image -----
    image(image, 0, 0, width, height);
    
    //----- image filtering -----
    if (!mousePressed) {
        
        //----- remove "/*" to enable filter. -----
        
        /*
        filter(filters.get("polyline"));
        applyPolyline(curve, slope, intercept);
        //*/
        
        /*
        filter(filters.get("gamma"));
        applyGamma(curve, gamma);
        //*/
        
        /*
        filter(filters.get("sigmoid"));
        applySigmoid(curve, gain);
        //*/
        
        /*
        filter(filters.get("posterize"));
        applyPosterize(curve, tone);
        //*/
        
        /*
        filter(filters.get("solarize"));
        applySolarize(curve, freq);
        //*/
        
        /*
        filter(filters.get("grayscale"));
        applyFlat(curve);
        
        //filter(filters.get("pseudocolor"));
        //*/
        
        /*
        filter(filters.get("mean"));
        applyFlat(curve);
        //*/
        
        /*
        filters.get("gaussian").set("horizontal", true);
        filter(filters.get("gaussian"));
        filters.get("gaussian").set("horizontal", false);
        filter(filters.get("gaussian"));
        applyGaussian(curve, gaussianSigma);
        //*/
        
        /*
        filters.get("sobel").set("horizontal", true);
        filter(filters.get("sobel"));
        applyFlat(curve);
        //*/
        
        /*
        filter(filters.get("prewittgradient"));
        applyFlat(curve);
        //*/
        
        /*
        filter(filters.get("sobelgradient"));
        applyFlat(curve);
        //*/
        
        /*
        filters.get("laplacian").set("isNeighborhood4", false);
        filter(filters.get("laplacian"));
        //filter(filters.get("redblue"));
        applyFlat(curve);
        //*/
        
        /*
        filter(filters.get("log"));
        //filter(filters.get("redblue"));
        //filter(filters.get("zerocrossing"));
        applyLog(curve, logSigma);
        //*/
        
        /*
        filter(filters.get("sharpening"));
        applyFlat(curve);
        //*/
        
        /*
        filter(filters.get("bilateral"));
        applyFlat(curve);
        //*/
        
        /*
        filter(filters.get("mosaic"));
        applyFlat(curve);
        //*/
        
        /* 
         * halftone filter. 
         * it doesn't look cool yet.
         * make it cool by yourself!
         */
         
        /*
        filter(filters.get("halftone"));
        applyFlat(curve);
        //*/
        
        drawCurve(curve);
    }
}

void keyPressed(){
    if (key == 's')
        saveFrame("image###.jpg");
}

//create lookup table for gaussian filter
float[] createGaussianWeight(float sigma)
{
    float weight[] = new float[radius];
    weight [0] = 1.;
    float totalWeight = 1.;
    for (int i = 1; i < radius; i++) {
        float w = exp(-i*i / (2.*sigma*sigma));
        weight[i] = w;
        totalWeight += w * 2.;//positive side and negative side
    }
    //normalize weight
    for (int i = 0; i < radius; i++) {
        weight[i] /= totalWeight;
    }
    return weight;
}

float[] createLogWeight(float sigma)
{
    float sigma2 = pow(sigma, 2.);
    float sigma4 = pow(sigma, 4.);
    float sigma6 = pow(sigma, 6.);
    float weight[] = new float[radius * (radius + 1) / 2];
    weight[0] = -1. / (PI * sigma4);
    float totalWeight = weight[0];
    for (int x = 1; x < radius; x++) {
        for (int y = 0; y <= x; y++) {
            float r2 = (float)(x*x + y*y);
            float w = (r2 - 2.*sigma2) / (TWO_PI * sigma6) * exp(-r2/(2.*sigma2));
            weight[x*(x+1)/2+y] = w;
            totalWeight += (x-y)*y==0 ? w*4. : w*8.;
        }
    }
    weight[0] -= totalWeight;
    return weight;
}

//===== code written below is just for drawing curve =====

float[] createIdentityLine(int resolution)
{
    float[] line = new float[resolution + 1];
    for (int i = 0; i < line.length; i++) {
        line[i] = (float)i / (float)resolution;
    }
    return line;
}

void apply(String functionName, float[] curve, float ... vars)
{
    switch (functionName) {
    case "polyline":
        applyPolyline(curve, vars[0], vars[1]);
        break;
    case "gamma":
        applyGamma(curve, vars[0]);
        break;
    case "sigmoid":
        applySigmoid(curve, vars[0]);
        break;
    case "toon":
        applyPosterize(curve, vars[0]);
        break;
    case "solarize":
        applySolarize(curve, vars[0]);
        break;
    case "gaussian":
        applyGaussian(curve, vars[0]);
        break;
    case "log":
        applyLog(curve, vars[0]);
        break;
    default:
        applyFlat(curve);
        break;
    }
}

void applyPolyline(float[] curve, float slope, float intercept)
{
    for (int i = 0; i < curve.length; i++) {
        curve[i] = constrain(slope * curve[i] + intercept, 0., 1.);
    }
}

void applyGamma(float[] curve, float gamma)
{
    for (int i = 0; i < curve.length; i++) {
        curve[i] = pow(curve[i], gamma);
    }
}

void applySigmoid(float[] curve, float gain)
{
    for (int i = 0; i < curve.length; i++) {
        curve[i] = 1. / (1. + exp(gain * (0.5 - curve[i])));
    }
}

void applyPosterize(float[] curve, float tone)
{
    for (int i = 0; i < curve.length; i++) {
        curve[i] = floor(curve[i] * tone) / (tone - 1.);
    }
}

float fract(float n)
{
    return n - floor(n);
}

void applySolarize(float[] curve, float freq)
{
    for (int i = 0; i < curve.length; i++) {
        curve[i] = 1. - abs(fract(freq * curve[i]) * 2. - 1.);
    }
}

void applyGaussian(float[] curve, float sigma)
{
    for (int i = 0; i < curve.length; i++) {
        float x2 = abs(curve[i] * 2. - 1.) * radius;
        curve[i] = exp(-x2*x2 / (2.*sigma*sigma)) / (sqrt(TWO_PI) * sigma);
    }
}

void applyLog(float[] curve, float sigma)
{
    for (int i = 0; i < curve.length; i++) {
        float x2 = abs(curve[i] * 2 -1.) * radius;
        curve[i] = (x2 * x2 - 2. * sigma * sigma) / (TWO_PI * sigma*sigma*sigma*sigma*sigma*sigma) * exp(-x2*x2/(2.*sigma*sigma)) + 0.5;
    }
}

void applyFlat(float[] curve)
{
    for (int i = 0; i < curve.length; i++) {
        curve[i] = 0.;
    }
}

void drawCurve(float[] curve)
{
    stroke(120);
    strokeWeight(3);
    noFill();
    beginShape();
    for (int i = 0; i < curve.length; i++) {
        float x = (float)i / (curve.length - 1.);//0 <= x <= 1
        float y = 1. - curve[i];
        vertex(x * width, y * height);
    }
    endShape();
}
