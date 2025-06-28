<?php

declare(strict_types=1);

/*
 * This file is part of rekalogika/analytics package.
 *
 * (c) Priyadi Iman Nurcahyo <https://rekalogika.dev>
 *
 * For the full copyright and license information, please view the LICENSE file
 * that was distributed with this source code.
 */

namespace Rekalogika\Analytics\UX\PanelBundle;

use Doctrine\Common\Collections\Expr\Expression;
use Symfony\Contracts\Translation\TranslatableInterface;

interface Filter
{
    public function getDimension(): string;

    public function getLabel(): TranslatableInterface;

    public function createExpression(): ?Expression;

    public function getTemplate(): string;
}
