
import { bytes } from "@ckb-lumos/codec";
import { blockchain } from "@ckb-lumos/base";
import { commons, config, helpers, RPC } from "@ckb-lumos/lumos";
import { Ethereum } from "./linkMetamask";

const CKB_RPC_URL = "http://localhost:8114";
const rpc = new RPC(CKB_RPC_URL);

export async function sendTx(objTx: helpers.TransactionSkeletonObject): Promise<string> {
  const CONFIG = config.getConfig();
  let tx = helpers.objectToTransactionSkeleton({
    ...objTx,
    "inputSinces": new Map()
  })
  tx = commons.omnilock.prepareSigningEntries(tx, { config: CONFIG });
  let signedMessage = await Ethereum.ethereum.request({
    method: "personal_sign",
    params: [Ethereum.ethereum.selectedAddress, tx.signingEntries.get(0)!.message],
  });

  let v = Number.parseInt(signedMessage.slice(-2), 16);
  if (v >= 27) v -= 27;
  signedMessage = "0x" + signedMessage.slice(2, -2) + v.toString(16).padStart(2, "0");

  const signedWitness = bytes.hexify(
    blockchain.WitnessArgs.pack({
      lock: commons.omnilock.OmnilockWitnessLock.pack({
        signature: bytes.bytify(signedMessage).buffer,
      }),
    })
  );

  tx = tx.update("witnesses", (witnesses) => witnesses.set(0, signedWitness));


  const signedTx = helpers.createTransactionFromSkeleton(tx);
  console.log('signedTx:', JSON.stringify(signedTx))
  const txHash = await rpc.sendTransaction(signedTx, "passthrough");

  return txHash;
}
