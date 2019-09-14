import * as CryptoJs from 'crypto-js';

class Block {
    public index: number;
    public hash: string;
    public prevHash: string;
    public data: string;
    public timeStamp: number;

    static calculateBlockHash = (
        index: number,
        prevHash: string,
        timeStamp: number,
        data: string
    ): string => CryptoJs.SHA256(index + prevHash + timeStamp + data).toString();

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



const genesisBlock:Block = new Block(0, "1991", "", "Hello", 123456);

let blockChain: Block[] = [genesisBlock];

const getBlockchain = (): Block[] => blockChain;

const getLatestBlock = (): Block => blockChain[blockChain.length - 1];

const getNewTimeStamp = (): number => Math.round(new Date().getTime() / 1000);

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

    return newBlock;
}

console.log(createNewBlock("Hello"), createNewBlock("Bye"));

export {};

