uniform sampler2D texture;

uniform float slope;
uniform float intercept;

in vec4 vertTexCoord;

out vec4 fragColor;

void main()
{
    vec3 outColor = slope * texture(texture, vertTexCoord.st).rgb + intercept;
    fragColor = vec4(outColor, 1.);
}
