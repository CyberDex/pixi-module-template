import { Component } from '../../src/Component';
import { argTypes, getDefaultArgs } from './utils/argTypes';
import { Sprite } from '@pixi/sprite';
import { preloadAssets } from './utils/helpers';
import { Container } from '@pixi/display';

const assets = {
    pixi: 'PixiLogo.png'
};

const args = {
    width: 380,
    height: 150,
    rotation: true
};

type Args = typeof args;

class Story
{
    view = new Container();
    private component: Component;
    private props: Args;

    constructor(props: Args)
    {
        this.props = props;

        preloadAssets(Object.values(assets)).then(() => this.createLayout(props));
    }

    createLayout({ width, height }: Args)
    {
        this.component = new Component();

        const image = Sprite.from(assets.pixi);

        image.anchor.set(0.5);
        image.width = width;
        image.height = height;

        this.component.addChild(image);

        this.view.addChild(this.component);

        this.resize(window.innerWidth, window.innerHeight);
    }

    resize(w: number, h: number)
    {
        if (!this.component) return;

        this.component.x = w / 2;
        this.component.y = h / 2;
    }

    update(delta: number)
    {
        if (!this.component) return;
        if (!this.props.rotation) return;

        this.component.rotation += 0.01 * delta;
    }
}

export const ComponentTest = (params: any) => new Story(params);

export default {
    title: 'Basic',
    argTypes: argTypes(args),
    args: getDefaultArgs(args)
};
