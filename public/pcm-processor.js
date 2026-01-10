class PCMProcessor extends AudioWorkletProcessor {
    constructor() {
        super();
        this.bufferSize = 2048; // 128ms latency at 16kHz
        this.buffer = new Float32Array(this.bufferSize);
        this.bufferIndex = 0;
    }

    process(inputs, outputs, parameters) {
        const input = inputs[0];
        if (!input || input.length === 0) return true;

        const channelData = input[0];

        for (let i = 0; i < channelData.length; i++) {
            this.buffer[this.bufferIndex++] = channelData[i];

            if (this.bufferIndex === this.bufferSize) {
                this.flush();
            }
        }

        return true;
    }

    flush() {
        const pcmData = new Int16Array(this.bufferIndex);
        for (let i = 0; i < this.bufferIndex; i++) {
            const s = Math.max(-1, Math.min(1, this.buffer[i]));
            pcmData[i] = s < 0 ? s * 0x8000 : s * 0x7FFF;
        }

        this.port.postMessage(pcmData.buffer, [pcmData.buffer]);
        this.bufferIndex = 0;
    }
}

registerProcessor('pcm-processor', PCMProcessor);
