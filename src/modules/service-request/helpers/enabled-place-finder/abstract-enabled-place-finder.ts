
import { Injectable } from "@nestjs/common";

@Injectable()
export default abstract class AbstractEnabledPlaceFinder {
    public abstract find(...args: any);
}