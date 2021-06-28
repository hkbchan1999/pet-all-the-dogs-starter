namespace SpriteKind {
    export const Dog = SpriteKind.create()
    export const HappyDog = SpriteKind.create()
    export const CORGUY = SpriteKind.create()
    export const Camera = SpriteKind.create()
}
function introSequence () {
    invisibleCamera = sprites.create(img`
        . . . 
        `, SpriteKind.Camera)
    tumbleWeed = sprites.create(tumbleWeedImg, SpriteKind.Player)
    scene.cameraFollowSprite(invisibleCamera)
    tiles.placeOnTile(invisibleCamera, tiles.getTileLocation(25, 8))
    story.queueStoryPart(function () {
        corGuy = sprites.create(corGuyImg, SpriteKind.CORGUY)
        tiles.placeOnTile(corGuy, tiles.getTileLocation(28, 0))
        corGuy.ay = 300
        story.printDialog("Sup bro, I'm CorGuy the Door Guy! And you are a tumbleweed", 70, 50, 50, 100)
    })
    story.queueStoryPart(function () {
        tiles.placeOnTile(tumbleWeed, tiles.getTileLocation(25, 0))
        tumbleWeed.ay = 300
    })
    story.queueStoryPart(function () {
        story.printDialog("Your mission is to play with all the good doggos who live on these plains", 70, 50, 50, 100)
        createDoggos()
    })
    story.queueStoryPart(function () {
        story.spriteMoveToTile(invisibleCamera, tiles.getTileLocation(0, 8), 200)
    })
    story.queueStoryPart(function () {
        story.spriteMoveToTile(invisibleCamera, tiles.getTileLocation(25, 8), 200)
    })
    story.queueStoryPart(function () {
        controller.moveSprite(tumbleWeed, 200, 0)
        invisibleCamera.destroy()
        scene.cameraFollowSprite(tumbleWeed)
    })
    controller.A.onEvent(ControllerButtonEvent.Pressed, function() {
        if(tumbleWeed && tumbleWeed.isHittingTile(CollisionDirection.Bottom)){
            tumbleWeed.vy = -200
        }
    })
}
function createDoggos () {
    for (let dog of dogImgs) {
        newDog = sprites.create(dog, SpriteKind.Dog)
        tiles.placeOnRandomTile(newDog, assets.tile`tile4`)
    }
}
let newDog: Sprite = null
let corGuy: Sprite = null
let invisibleCamera: Sprite = null
let dogImgs: Image[] = []
let tumbleWeedImg: Image = null
let corGuyImg: Image = null
let tumbleWeed: Sprite = null
corGuyImg = img`
    .............................fff....
    ..fff......................ff44f....
    ..f44fff.................ff4444f....
    ...f444ff................f44334f....
    ...f4344ff...ffffff.....f444344f....
    ...f43344fffff44444ffff.f433344f....
    ...f44334ff44444444444fff44344ff....
    ...ff4444444444444444444f4444f......
    ....ff4444444444444444444444f.......
    .....ff44444444444444444444ff.......
    .....f444444f444444f4444444f........
    .....f444444f444444f4444444f........
    .....f44ddd4444444444ddd44f.........
    .....f44dddd44444444dddd44ff........
    .....f44ddddddfffdddddddd44f........
    ...fff44dddddddfddddddddd44ff.......
    ...f4444ddddffddddffddddd444f.......
    ...f444ddddddffffffdddddd44ff.......
    ....f44dddddddddddddddddd44f........
    ....f4dddddddddddddddddd444f........
    ...f44dddddddddddddddddd444f........
    ...f4ddddddddddddddddddd444ff.......
    ...f4ddddddddddddddddd44d444ff......
    ...f44dddddddddddddddd44d4444fff....
    ...f44dddddddddddddddd444d44444ff...
    ...ff44dddddddddddddd44444d444444ff.
    ....f44fdddddddddfdd444f44d4444444ff
    ....f44ffdddddddfddd44ff44444444444f
    ....ff44fddddddfddd444f4444444444dff
    .....f44ffdddddfd4444f444444f444ddf.
    ....fff4dfffffffd44fff44444ff44dddf.
    ....f444ff.....fd4ffffffffff4dddfff.
    ....fffff......ffff........ffffff...
    `
tumbleWeedImg = img`
    . . 4 4 4 5 5 4 4 . . . . . . . 
    . 5 5 4 4 4 5 5 4 4 5 4 4 . . . 
    . 4 5 5 4 4 4 5 4 4 4 5 4 4 . . 
    4 4 4 4 4 4 4 4 5 4 4 5 4 4 5 . 
    4 5 5 5 4 4 4 4 5 4 4 5 4 4 5 4 
    5 5 4 5 5 4 4 4 5 4 4 4 4 4 5 4 
    4 4 4 4 4 4 4 4 5 4 5 4 4 5 5 4 
    4 4 4 4 4 4 4 4 4 4 5 4 4 4 4 4 
    4 5 5 4 4 4 4 4 5 5 5 4 5 4 4 5 
    4 5 4 4 4 5 4 4 5 5 4 5 5 4 4 5 
    4 5 4 4 4 5 4 4 4 4 4 4 4 4 5 5 
    5 5 4 4 4 5 4 4 4 4 4 4 4 5 5 4 
    5 4 4 4 4 5 5 4 4 4 4 4 5 5 4 4 
    . 4 5 4 4 4 5 5 5 5 5 4 4 4 4 . 
    . . 5 4 4 4 4 4 4 4 4 4 4 4 4 . 
    . . 5 5 5 4 4 4 4 4 5 5 5 5 5 . 
    `
tiles.setTilemap(tilemap`level`)
dogImgs = [
assets.image`tux`,
assets.image`hotdog`,
assets.image`Layla`,
assets.image`Shadow`,
img`
    ....................
    ....................
    ....................
    ............eeeee...
    ...........eddddde..
    ...........ededdde..
    eeeeeeeeeeeedefdfee.
    eddddddddddededdddfe
    eeeddddddddeeeddddde
    ..edddddddddddddddde
    ..edddddddddddddeee.
    ..edddddddddddde....
    ..eddddddddddde.....
    ..eedede.edede......
    ..eedede.edede......
    ..eeeeee.eeeee......
    `,
assets.image`Milo`
]
introSequence()
