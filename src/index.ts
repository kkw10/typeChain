import * as CryptoJs from 'crypto-js';

class Block {
    static calculateBlockHash = (
        index: number,
        prevHash: string,
        timeStamp: number,
        data: string
    ): string => CryptoJs.SHA256(index + prevHash + timeStamp + data).toString();

    static validateStructure = (aBlock: Block): boolean =>
        typeof aBlock.index === "number"&& 
        typeof aBlock.hash === "string" &&
        typeof aBlock.prevHash === "string" &&
        typeof aBlock.timeStamp === "number" &&
        typeof aBlock.data === "string";

    public index: number;
    public hash: string;
    public prevHash: string;
    public data: string;
    public timeStamp: number;

    constructor (
        index: number,
        hash: string,
        prevHash: string,
        data: string,
        timeStamp: number
    ) {
        this.index = index;
        this.hash = hash;
        this.prevHash = prevHash;
        this.data = data;
        this.timeStamp = timeStamp;
    }
}



const genesisBlock:Block = new Block(0, "1991", "", "dummy", 123456);

let blockChain: Block[] = [genesisBlock];

const getBlockchain = (): Block[] => blockChain;

const getLatestBlock = (): Block => blockChain[blockChain.length - 1];

const getNewTimeStamp = (): number => Math.round(new Date().getTime() / 1000);

const getHashForBlock = (aBlock: Block): string => Block.calculateBlockHash(
    aBlock.index,
    aBlock.prevHash,
    aBlock.timeStamp,
    aBlock.data
);

const createNewBlock = (data: string): Block => {
    const prevBlock: Block = getLatestBlock();
    const newIndex: number = prevBlock.index + 1;
    const newTimeStamp: number = getNewTimeStamp();
    const newHash: string = Block.calculateBlockHash(
        newIndex,
        prevBlock.hash,
        newTimeStamp,
        data
    );

    const newBlock: Block = new Block(
        newIndex,
        newHash,
        prevBlock.hash,
        data,
        newTimeStamp
    )

    addBlock(newBlock);

    return newBlock;
}

const isBlockValid = (targetBlock: Block, prevBlock: Block): boolean => {
    if(!Block.validateStructure(targetBlock)) {
        return false;

    } else if(prevBlock.index + 1 !== targetBlock.index) {
        return false;

    } else if(prevBlock.hash !== targetBlock.prevHash) {
        return false;

    } else if(getHashForBlock(targetBlock) !== targetBlock.hash) {
        return false;

    } else {
        return true;
    }
}

const addBlock = (targetBlock: Block): void => {
    if(isBlockValid(targetBlock, getLatestBlock())) {
        blockChain.push(targetBlock);
    }
}

createNewBlock("block-1")
createNewBlock("block-2")
createNewBlock("block-3")
createNewBlock("block-4")
createNewBlock("block-5")

console.log(blockChain);

export {};

