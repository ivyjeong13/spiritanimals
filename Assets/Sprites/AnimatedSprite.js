#pragma strict

var spriteManager : GameObject; //reference to the SpriteManager gameObject
var spriteWorldWidth : float = 1.0f;
var spriteWorldHeight : float = 1.0f;
var depth : int = 0;
var position : Vector2 = Vector2(0,0); //The uv coodinates of the base sprite when unanimated
var dimensions : Vector2 = Vector2(0,0); //The dimensions of the sprite, which applies to all frames
var animationInfo : SpriteAnimation[];

protected var sprite : Sprite; //Reference to the sprite that is created

class SpriteAnimation
{
	var name : String = "newAnimation"; //The name of the animation
	var loopNumber : int = 0; //-1 to loop infinitely
	var loopReverse : boolean = false; //if true, the animation will play normally, and then immediatly after in reverse
	
	var start : Vector2 = Vector2(0,0); //The uv coordinates of the lower-left corner of the start sprite
	var rows : int = 0;
	var cols : int = 0;
	var totalCells : int = 0;
	var fps : float = 30.0f;
}

function Start () {
	//get the actual SpriteManager component
	var spriteManager:SpriteManager = spriteManager.GetComponent("LinkedSpriteManager") as SpriteManager;
	//initialize the sprite
	sprite = spriteManager.AddSprite(this.gameObject, spriteWorldWidth, spriteWorldHeight, 
		position.x, position.y, dimensions.x, dimensions.y, false);
	
	//Create all animations
	for (var anim : SpriteAnimation in animationInfo)
	{
		var uvAnim : UVAnimation = new UVAnimation();
		
		uvAnim.name = anim.name;
		uvAnim.loopCycles = anim.loopNumber;
		uvAnim.loopReverse = anim.loopReverse;
		uvAnim.framerate = anim.fps;
		
		uvAnim.BuildUVAnim(spriteManager.PixelCoordToUVCoord(anim.start), spriteManager.PixelSpaceToUVSpace(dimensions), 
			anim.cols, anim.rows, anim.totalCells, anim.fps);
		sprite.AddAnimation(uvAnim);
	}
	
	sprite.SetDrawLayer(depth);
}

function Update () {
}

function SetDrawLayer(layer : int)
{
	sprite.SetDrawLayer(layer);
}

function PlayAnimation(animationName : String)
{
	if ( animationName == "" )
	{
		Debug.Log(sprite.index + " : PlayAnimation: You must pass the name of the animation to play.");
		return;
	}
	sprite.PlayAnim(animationName);
}

function PlayAnimationInReverse(animationName : String)
{
	if ( animationName == "" )
	{
		Debug.Log(sprite.index + " : PlayAnimation: You must pass the name of the animation to play.");
		return;
	}
	sprite.PlayAnimInReverse(animationName);
}

function PauseAnimation()
{
	sprite.PauseAnim();
}

function UnPauseAnimation()
{
	sprite.UnpauseAnim();
}