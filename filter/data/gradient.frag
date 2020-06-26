uniform sampler2D horizontalTexture, verticalTexture;
uniform vec2 texOffset;

in vec4 vertTexCoord;


void main()
{
    vec3 horizontalColor = texture(horizontalTexture, vertTexCoord.st);
    vec3 verticalColor = texture(verticalTexture, vertTexCoord.st);
    vec3 gradient = sqrt(horizontalColor*horizontalColor/2. + verticalColor*verticalColor/2.);
    fragColor = vec4(gradient, 1.);
}
